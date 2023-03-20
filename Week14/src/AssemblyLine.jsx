import PropTypes from "prop-types";
import React from "react";

class AssemblyLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: props.stages.map(() => []),
      inputVal: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputVal: e.target.value });
  };

  handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      const { inputVal } = this.state;
      const { stages } = this.state;
      stages[0].unshift(inputVal);
      this.setState({ stages, inputVal: "" });
    }
  };

  handleItemClick = (stageIndex, itemIndex, direction) => {
    const { stages } = this.state;
    const item = stages[stageIndex].splice(itemIndex, 1)[0];
    if (direction === "forward") {
      if (stageIndex === stages.length - 1) {
        // item is in the last stage and is deleted entirely
        return;
      }
      stages[stageIndex + 1].unshift(item);
    } else if (direction === "backward") {
      if (stageIndex === 0) {
        // item is moved backwards past the first stage and is deleted
        return;
      }
      stages[stageIndex - 1].push(item);
    }
    this.setState({ stages });
  };

  render() {
    const { stages, inputVal } = this.state;
    return (
      <>
        <input
          className="assembly-add-item"
          value={inputVal}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKeyPress}
        />
        {stages.map((items, stageIndex) => (
          <div key={stageIndex} className="assembly-stage">
            {items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                className="assembly-item"
                onClick={() =>
                  this.handleItemClick(stageIndex, itemIndex, "forward")
                }
                onContextMenu={(e) => {
                  e.preventDefault();
                  this.handleItemClick(stageIndex, itemIndex, "backward");
                }}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </>
    );
  }
}

AssemblyLine.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default AssemblyLine;