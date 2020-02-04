import * as React from 'react';
import * as moment from 'moment';

import { DatePicker, DayOfWeek, IDatePickerProps, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/dateTimePicker';

import * as strings from 'FormFieldStrings';

export interface IDateFormFieldProps extends IDatePickerProps {
  locale: string;
  fieldJson: string;
  defaultValue: string
  valueChanged(newValue: string): void;

}

export interface IDateFormFieldState {
  defaultValue: Date
}

export default class DateFormField extends React.Component<IDateFormFieldProps, IDateFormFieldState>{
  constructor(props) {
    super(props);


    this.state = {
      defaultValue: new Date()
    }
    this.handleChange = this.handleChange.bind(this)

  }

  public componentDidMount() {
    const defaultVal = this.props.defaultValue === '[today]' ? new Date() : null;

    this.setState({
      defaultValue: defaultVal
    })
  }

  public handleChange = (e) => {
    const now = moment(e);
    const { fieldJson, locale, valueChanged } = this.props
    const setDateTimeFieldValue = fieldJson === '1' ? now.format("l") + ' ' + now.format("LT") : now.format("l")
    valueChanged(setDateTimeFieldValue);
    this.setState({
      defaultValue: new Date(setDateTimeFieldValue)
    })
  }

  public render() {
    const { defaultValue } = this.state
    const displayType = this.props.fieldJson === '1' ? DateConvention.DateTime : DateConvention.Date;
    return (
      <div>
        <DateTimePicker
          dateConvention={displayType}
          timeConvention={TimeConvention.Hours12}
          formatDate={(date: Date) => (typeof date.toLocaleDateString === 'function') ? date.toLocaleDateString(this.props.locale) : ''}
          value={defaultValue}
          onChange={this.handleChange}
        />
      </div>

    );
  }
}
