import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { API } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}
  getPositions(): Observable<any> {
    const id = JSON.parse(localStorage.getItem('user') || '{}')?._id;
    return this.http.get(`${API}/orders/getTodaysOrders/${id}`).pipe(
      map((response) => {
        return this.test(response);
      }),
      catchError((response) => of(response.error))
    );
  }

  async test(data) {
    if (!data) {
      return [];
    }
    const newData = data?.filter((d) => d.status === 'COMPLETE');
    const groupByOrderSymbol = this.groupBy(newData, 'orderSymbol');
    return this.newMap(groupByOrderSymbol);
  }

  groupBy(array, key) {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  }

  async newMap(data) {
    let dataToDisplay = [];
    for (const okey in data) {
      let buyArray = [];
      let sellArray = [];
      const orders = data[okey];
      const obj = {
        orderSymbol: okey,
        quantity: 0,
        buyValue: 0,
        sellValue: 0,
        pnl: 0,
      };

      Array.from(orders).forEach((order: any) => {
        if (order?.direction === 'BUY') {
          buyArray.push(order);
        } else {
          sellArray.push(order);
        }
      });

      let i = 0,
        j = 0;
      while (i < buyArray.length && j < sellArray.length) {
        obj['quantity'] = obj['quantity'] + 0;
        obj['buyValue'] = obj['buyValue'] + this.getBSV(buyArray[i]);
        obj['sellValue'] = obj['sellValue'] + this.getBSV(sellArray[j]);
        const pnl = obj['sellValue'] - obj['buyValue'];
        obj['pnl'] = obj['pnl'] + pnl;
        obj['ltp'] = await this.getltp(buyArray[i]);
        i++;
        j++;
      }

      while (i < buyArray.length) {
        const sellLtpValue = await this.getBuySellValue(buyArray[i]);
        obj['quantity'] = obj['quantity'] + 1;
        obj['buyValue'] = obj['buyValue'] + this.getBSV(buyArray[i]);
        obj['sellValue'] = obj['sellValue'];
        const pnl = obj['sellValue'] + sellLtpValue - obj['buyValue'];
        obj['pnl'] = obj['pnl'] + pnl;
        obj['ltp'] = await this.getltp(buyArray[i]);
        i++;
      }

      while (j < sellArray.length) {
        const buyLtpValue = await this.getBuySellValue(sellArray[j]);
        obj['quantity'] = obj['quantity'] - 1;
        obj['buyValue'] = obj['buyValue'];
        obj['sellValue'] = obj['sellValue'] + this.getBSV(sellArray[j]);
        const pnl = obj['sellValue'] - (obj['buyValue'] + buyLtpValue);
        obj['pnl'] = obj['pnl'] + pnl;
        obj['ltp'] = await this.getltp(sellArray[j]);
        j++;
      }
      dataToDisplay.push(obj);
    }
    return dataToDisplay;
  }

  getBSV(order) {
    return order?.price * order?.quantity;
  }

  async getBuySellValue(order) {
    let value;
    await this.http
      .get(
        `http://ec2-52-66-225-112.ap-south-1.compute.amazonaws.com:4007/api/LTP?instrument=${order?.orderSymbol}`
      )
      .pipe(take(1))
      .toPromise()
      .then((ltpData: any) => {
        value = ltpData?.ltp * order?.quantity;
      });
    return value;
  }

  async getltp(order) {
    let ltp;
    await this.http
      .get(
        `http://ec2-52-66-225-112.ap-south-1.compute.amazonaws.com:4007/api/LTP?instrument=${order?.orderSymbol}`
      )
      .pipe(take(1))
      .toPromise()
      .then((ltpData: any) => {
        ltp = ltpData?.ltp;
      });
    return ltp;
  }
}
