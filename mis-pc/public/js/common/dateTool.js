var React=require("react");
//import { DatePicker } from 'antd';
var DatePicker=require("antd/lib/date-picker");

var DateTool = React.createClass({
  getInitialState() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  },
  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  },
  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  },
  onChange(field, value) {
    this.setState({
      [field]: value,
    },()=>{
    	this.props.handleChange({startValue:this.state.startValue,endValue:this.state.endValue})
    });
  },
  onStartChange(value) {
    this.onChange('startValue', value);
  },
  onEndChange(value) {
    this.onChange('endValue', value);
  },
  handleStartToggle(obj) {
    if (!obj.open) {
      this.setState({ endOpen: true });
    }
  },
  handleEndToggle(obj) {
    this.setState({ endOpen: obj.open });
  },
  render() {
    return (
      <div className="group__dateTool">
        <DatePicker
          style={this.props.style}
          size={this.props.size} showTime
          disabledDate={this.disabledStartDate}
          format="yyyy-MM-dd"
          value={this.state.startValue}
          placeholder="开始日期"
          onChange={this.onStartChange}
          toggleOpen={this.handleStartToggle}
        />
        {" -- "}
        <DatePicker
          style={this.props.style}
          size={this.props.size} showTime
          disabledDate={this.disabledEndDate}
          format="yyyy-MM-dd"
          value={this.state.endValue}
          placeholder="结束日期"
          onChange={this.onEndChange}
          open={this.state.endOpen}
          toggleOpen={this.handleEndToggle}
        />
      </div>
    );
  },
});

module.exports = DateTool