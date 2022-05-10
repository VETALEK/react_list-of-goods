import React from 'react';
import { GoodsList } from '../GoodsList';

import './SortableList.scss';

type Props = {
  goods: string[];
};

enum SortOrder {
  none = 0,
  alphabetic = 1,
  length = 2,
}

type State = {
  isShown: boolean;
  isReversed: boolean;
  sortOrder: SortOrder;
  minLen: number;
};

// eslint-disable-next-line
export class SortableList extends React.Component<Props, State> {
  state = {
    isShown: false,
    isReversed: false,
    sortOrder: SortOrder.none,
    minLen: 1,
  };

  show = () => {
    this.setState(
      {
        isShown: true,
      },
    );
  };

  reverse = () => {
    this.setState((prevState) => (
      {
        isReversed: !prevState.isReversed,
      }
    ));
  };

  sortBy = (parameter: SortOrder) => {
    this.setState(
      {
        sortOrder: parameter,
      },
    );
  };

  reset = () => {
    this.setState(
      {
        isReversed: false,
        sortOrder: SortOrder.none,
        minLen: 1,
      },
    );
  };

  setMinLen = (minLen: number) => {
    this.setState(
      {
        minLen,
      },
    );
  };

  render() {
    const {
      isShown,
      isReversed,
      sortOrder,
      minLen,
    } = this.state;

    if (!isShown) {
      return (
        <div className="SortableList">
          <button
            type="button"
            className="SortableList__button"
            onClick={this.show}
          >
            Start
          </button>
        </div>
      );
    }

    const {
      goods,
    } = this.props;

    let preparedList: string[] = [];

    preparedList = goods.slice()
      .filter((good) => good.length >= minLen);

    switch (sortOrder) {
      case SortOrder.alphabetic: {
        preparedList.sort(
          (good1, good2) => good1.localeCompare(good2),
        );

        break;
      }

      case SortOrder.length: {
        preparedList.sort(
          (good1, good2) => good1.length - good2.length,
        );

        break;
      }

      default: {
        break;
      }
    }

    if (isReversed) {
      preparedList.reverse();
    }

    return (
      <div className="SortableList">
        <div className="SortableList__buttonsSection">
          <input
            className="SortableList__checkbox"
            type="checkbox"
            id="reverseToggler"
            checked={isReversed}
            onChange={this.reverse}
          />

          <label
            className="SortableList__button SortableList__toggler"
            htmlFor="reverseToggler"
          >
            Reverse
          </label>

          <button
            className="SortableList__button"
            type="button"
            onClick={() => this.sortBy(SortOrder.alphabetic)}
          >
            Sort alphabetically
          </button>

          <button
            className="SortableList__button"
            type="button"
            onClick={() => this.sortBy(SortOrder.length)}
          >
            Sort by length
          </button>

          <select
            className="SortableList__dropdown"
            onChange={
              (e) => this.setMinLen(Number(e.target.value))
            }
          >
            {
              (new Array(10))
                .fill(null)
                .map((_, index) => (
                  <option
                    value={index + 1}
                    // eslint-disable-next-line
                    key={index + 1}
                    selected={index + 1 === minLen}
                  >
                    {`${index + 1}+ letters`}
                  </option>
                ))
            }
          </select>

          <button
            className="SortableList__button"
            type="button"
            onClick={this.reset}
          >
            Reset
          </button>
        </div>

        <div className="SortableList__goodsList">
          <GoodsList goods={preparedList} />
        </div>
      </div>
    );
  }
}
