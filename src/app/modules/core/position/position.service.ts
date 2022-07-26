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
    const groupByPairId = this.groupBy(newData, 'pairId');
    return await this.mapData(groupByPairId);
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

  async mapData(data) {
    let dataToDisplay = [];
    for (const key in data) {
      if (data[key]?.length === 2) {
        dataToDisplay.push({
          orderSymbol: data[key][0]?.orderSymbol,
          buyValue: this.getBuyValue(data, key),
          sellValue: this.getSellValue(data, key),
          pnl: this.getSellValue(data, key) - this.getBuyValue(data, key),
          ltp: null,
        });
      } else if (data[key][0]?.direction === 'BUY') {
        dataToDisplay.push(await this.getBuyCase(data, key));
      } else {
        dataToDisplay.push(await this.getSellCase(data, key));
      }
    }
    return dataToDisplay;
  }

  getBuyValue(data, key): any {
    return data[key][0]?.direction === 'BUY'
      ? data[key][0]?.price * data[key][0]?.quantity
      : data[key][1]?.price * data[key][1]?.quantity;
  }

  getSellValue(data, key): any {
    return data[key][0]?.direction === 'SELL'
      ? data[key][0]?.price * data[key][0]?.quantity
      : data[key][1]?.price * data[key][1]?.quantity;
  }

  async getBuyCase(data, key) {
    let d = {};
    await this.http
      .get(
        `http://ec2-3-108-53-207.ap-south-1.compute.amazonaws.com:4007/api/LTP?instrument=${data[key][0].orderSymbol}`
      )
      .pipe(take(1))
      .toPromise()
      .then((ltpData: any) => {
        d = {
          orderSymbol: data[key][0]?.orderSymbol,
          buyValue: data[key][0].price * data[key][0].quantity,
          sellValue: ltpData?.ltp * data[key][0].quantity,
          pnl:
            ltpData?.ltp * data[key][0].quantity -
            data[key][0].price * data[key][0].quantity,
          ltp: ltpData?.ltp,
        };
      });
    return d;
  }

  async getSellCase(data, key) {
    let d = {};
    await this.http
      .get(
        `http://ec2-3-108-53-207.ap-south-1.compute.amazonaws.com:4007/api/LTP?instrument=${data[key][0].orderSymbol}`
      )
      .pipe(take(1))
      .toPromise()
      .then((ltpData: any) => {
        d = {
          orderSymbol: data[key][0]?.orderSymbol,
          buyValue: ltpData?.ltp * data[key][0].quantity,
          sellValue: data[key][0].price * data[key][0].quantity,
          pnl:
            data[key][0].price * data[key][0].quantity -
            ltpData?.ltp * data[key][0].quantity,
          ltp: ltpData?.ltp,
        };
      });
    return d;
  }
}
