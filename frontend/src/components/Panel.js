import dc from "dc"
import React from 'react';
import { css } from 'glamor'
import {constructLengthChart, constructCoverageChart, constructReferenceChart} from "../utils/constructChart";


const outerStyles = css({
  width: '100%',
  margin: 'auto',
  minHeight: "400px", // TODO
  boxShadow: '0px 2px rgba(0, 0, 0, 0.14) inset'
})

const flexRowContainer = css({
  display: "flex",
  'flexDirection': 'row',
  justifyContent: 'space-between'
})

const panelElement = css({
  width: '33%',
  margin: 'auto'
})

const chartTitle = css({
  "fontWeight": "bold",
  "fontSize": "1em"
})

const panelTitle = css({
  "fontWeight": "bold",
  "fontSize": "1.3em"
})

const resetStyle = css({
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  borderRadius: 4,
  fontFamily: "lato",
  fontWeight: "bold",
  float: "right"
})

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.DOMref = {};
  }
  renderAll() {
    dc.renderAll();
  }
  componentDidMount() {
    this.setState({
      coverage: constructCoverageChart(this.DOMref.coverage, this.props.data, this.renderAll),
      length: constructLengthChart(this.DOMref.length, this.props.data, this.renderAll),
      reference: constructReferenceChart(this.DOMref.reference, this.props.data, this.renderAll)
    })
    this.renderAll();
  }

  render() {
    console.log(this.props.data)
    return (
      <div {...outerStyles}>
        <div {...flexRowContainer}>
          <div {...panelTitle}>
            {`${this.props.info}. Data version ${this.props.version}. Total reads: ${this.props.data.size()}. Selected reads: todo`}
          </div>
          <button {...resetStyle} onClick={() => {dc.filterAll(); dc.renderAll()}}>
            reset filters
          </button>
        </div>
        <div {...flexRowContainer}>
          <div {...panelElement}>
            <div {...chartTitle}>{"coverage"}</div>
            <div ref={(r) => {this.DOMref.coverage = r}}/>
          </div>
          <div {...panelElement}>
            <div {...chartTitle}>{"length"}</div>
            <div ref={(r) => {this.DOMref.length = r}}/>
          </div>
          <div {...panelElement}>
            <div {...chartTitle}>{"reference"}</div>
            <div ref={(r) => {this.DOMref.reference = r}}/>
          </div>
        </div>
      </div>
    )

  }
}

export default Panel;
