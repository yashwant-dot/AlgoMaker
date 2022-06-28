import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  directionOptions,
  timeframeOptions,
  indicatorOptions,
  candleParamOptions,
  operatorOptions,
  orderTypeOptions,
  targetUnitOptions,
  stopLossUnitOptions,
  exchangeOptions,
  futDataSymbols,
  optNiftyOrderSymbols,
  optBankNiftyOrderSymbols,
  optDataSymbol,
} from '../../models';

@Component({
  selector: 'app-stratergy-form',
  templateUrl: './stratergy-form.component.html',
  styleUrls: ['./stratergy-form.component.scss'],
})
export class StratergyFormComponent implements OnInit {
  directionOptions = directionOptions;
  timeframeOptions = timeframeOptions;
  indicatorOptions = indicatorOptions;
  candleParamOptions = candleParamOptions;
  operatorOptions = operatorOptions;
  orderTypeOptions = orderTypeOptions;
  targetUnitOptions = targetUnitOptions;
  stopLossUnitOptions = stopLossUnitOptions;
  exchangeOptions = exchangeOptions;
  @Input() stratergyFormGroup!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Output() addStratergy: EventEmitter<any> = new EventEmitter();
  @Output() addIndicator: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get indicators(): FormArray {
    return this.stratergyFormGroup.get('indicators') as FormArray;
  }

  get exchange(): FormControl {
    return this.stratergyFormGroup.get('exchange') as FormControl;
  }

  get dataSymbol(): FormControl {
    return this.stratergyFormGroup.get('dataSymbol') as FormControl;
  }

  getDataSymbolDropdownOptions(): any {
    if (
      this.exchange.value === 'fut_fut' ||
      this.exchange.value === 'fut_opt'
    ) {
      return futDataSymbols;
    } else if (this.exchange.value === 'opt_opt') {
      return optDataSymbol;
    }
    return [];
  }

  getOrderSymbolDropdownOptions(): any {
    if (this.exchange.value === 'fut_fut') {
      if (this.dataSymbol.value === 'NIFTY_FUT') return [futDataSymbols[0]];
      else if (this.dataSymbol.value === 'BANKNIFTY_FUT')
        return [futDataSymbols[1]];
      else return [];
    } else if (this.exchange.value === 'fut_opt') {
      if (this.dataSymbol.value === 'NIFTY_FUT') return optNiftyOrderSymbols;
      else if (this.dataSymbol.value === 'BANKNIFTY_FUT')
        return optBankNiftyOrderSymbols;
      else return [];
    } else if (this.exchange.value === 'opt_opt') {
      if (
        this.dataSymbol.value &&
        this.dataSymbol.value?.split('_')[0] === 'NIFTY'
      )
        return optNiftyOrderSymbols;
      else if (
        this.dataSymbol.value &&
        this.dataSymbol.value?.split('_')[0] === 'BANKNIFTY'
      )
        return optBankNiftyOrderSymbols;
      else return [];
    } else return [];
  }
}
