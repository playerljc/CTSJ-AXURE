import React from 'react';
import PropTypes from 'prop-types';

import FontAwesoneFreeCategories from '@fortawesome/fontawesome-free/metadata/categories.yml';

import './FontAwesomeFree.less';

const selectorPrefix = 'CT-UI-FontAwesomeFree';

export { FontAwesoneFreeCategories };

/**
 * FontAwesomeFree
 * @class FontAwesomeFree
 * @classdesc FontAwesomeFree
 */
class FontAwesomeFree extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      search: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      search: '',
    });
  }

  /**
   * onChoose
   * @param {String} - v
   */
  onChooes(v) {
    this.setState({
      value: v,
    });
  }

  /**
   * getValue
   * @return {String}
   */
  getValue() {
    return `fas fa-${this.state.value}`;
  }

  /**
   * renderInner
   * @return {ReactElement}
   */
  renderInner() {
    const { search = '', value = '' } = this.state;
    const categories = Object.getOwnPropertyNames(FontAwesoneFreeCategories);
    return categories.map((c, index) => {
      const { icons, label } = FontAwesoneFreeCategories[c];

      const data = icons.filter((i) => {
        return !search ? true : i.includes(search);
      });

      return data.length === 0 ? null : (
        <dl key={index} className={`${selectorPrefix}-Categorie`}>
          <dt className={`${selectorPrefix}-Categorie-Label`}>{label}</dt>
          <dd className={`${selectorPrefix}-Categorie-IconsWrap`}>
            <div className={`${selectorPrefix}-Categorie-Icons`}>
              {icons
                .filter((i) => {
                  return !search ? true : i.includes(search);
                })
                .map((i) => {
                  return (
                    <div
                      key={i}
                      className={`${selectorPrefix}-Categorie-Icon-Wrap ${
                        value === i ? 'active' : ''
                      } `}
                      onClick={() => {
                        this.onChooes(i);
                      }}
                    >
                      <i className={`fas fa-${i} ${selectorPrefix}-Categorie-Icon`} title={i} />
                      <span className={`${selectorPrefix}-Categorie-Icon-Label`}>{i}</span>
                    </div>
                  );
                })}
            </div>
          </dd>
        </dl>
      );
    });
  }

  /**
   * onSearch
   */
  onSearch(e) {
    this.setState({
      search: e.target.value.trim(),
    });
  }

  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix}-Search`}>
          <input
            type="search"
            className={`${selectorPrefix}-Search-Input`}
            placeholder="search icons..."
            onKeyDownCapture={(e) => {
              e.stopPropagation();
            }}
            onChange={::this.onSearch}
          />
          <i className={`fa fa-search ${selectorPrefix}-Search-Icon`} />
        </div>
        <div className={`${selectorPrefix}-Inner`}>{this.renderInner()}</div>
      </div>
    );
  }
}

FontAwesomeFree.propTypes = {
  value: PropTypes.string,
  zIndex: PropTypes.number,
};

export default FontAwesomeFree;
