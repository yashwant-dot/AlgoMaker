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
  selector: 'app-strategy-form',
  templateUrl: './strategy-form.component.html',
  styleUrls: ['./strategy-form.component.scss'],
})
export class StrategyFormComponent implements OnInit {
  directionOptions = directionOptions;
  timeframeOptions = timeframeOptions;
  indicatorOptions = indicatorOptions;
  candleParamOptions = candleParamOptions;
  operatorOptions = operatorOptions;
  orderTypeOptions = orderTypeOptions;
  targetUnitOptions = targetUnitOptions;
  stopLossUnitOptions = stopLossUnitOptions;
  exchangeOptions = exchangeOptions;
  @Input() strategyFormGroup!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Input() indicatorError: string;
  @Output() addStrategy: EventEmitter<any> = new EventEmitter();
  @Output() addIndicator: EventEmitter<any> = new EventEmitter();
  @Output() deleteIndicator: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  get indicators(): FormArray {
    return this.strategyFormGroup.get('indicators') as FormArray;
  }

  get exchange(): FormControl {
    return this.strategyFormGroup.get('exchange') as FormControl;
  }

  get dataSymbol(): FormControl {
    return this.strategyFormGroup.get('dataSymbol') as FormControl;
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
