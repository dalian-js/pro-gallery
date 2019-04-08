
import React from 'react';
import _ from 'lodash';
import {cssScrollHelper} from '../helpers/cssScrollHelper';

export default class CssScrollIndicator extends React.Component {

  constructor() {
    super();

    this.state = {
      scrollTop: 0,
      scrollLeft: 0
    };
  }

  removeScrollListener() {
    if (this.scrollEventListenerSet) {
      const scrollingElement = this.props.scrollingElement;
      try {
        scrollingElement.vertical().removeEventListener('scroll', this.onVerticalScroll);
      } catch (e) {
        //
      }

      try {
        const {oneRow} = this.props;
        if (oneRow) {
          scrollingElement.horizontal().removeEventListener('scroll', this.onHorizontalScroll);
        }
      } catch (e) {
        //
      }
      this.scrollEventListenerSet = false;
    }
  }

  initScrollListener() {
    if (this.scrollEventListenerSet) {
      this.removeScrollListener();
    }

    this.scrollEventListenerSet = true;

    const scrollingElement = this.props.scrollingElement;
    const {oneRow} = this.props;
    if (oneRow) {
      //Horizontal Scroll
      this.onHorizontalScroll = e => {
        const target = (e.currentTarget || e.target || e);
        const left = (target && (target.scrollX || target.scrollLeft || target.x));
        if (left >= 0) {
          this.setState({
            scrollTop: left, //todo use both scrollTop and scrollLeft
            scrollLeft: left
          });
          this.props.getMoreItemsIfNeeded(left);
          this.props.enableScrollPreload();
        }
      };
      try {
        scrollingElement.horizontal().addEventListener('scroll', this.onHorizontalScroll);
      } catch (e) {
        //
      }
    } else {
      //Vertical Scroll
      this.onVerticalScroll = e => {
        const target = (e.currentTarget || e.target || e);
        const top = (target && (target.scrollY || target.scrollTop || target.y));
        if (top >= 0) {
          this.setState({
            scrollTop: top
          });
          this.props.getMoreItemsIfNeeded(top);
          this.props.enableScrollPreload();
        }
      };
      try {
        scrollingElement.vertical().addEventListener('scroll', this.onVerticalScroll);
      } catch (e) {
        //
      }
    }
  }


  componentWillUnmount() {
    this.removeScrollListener();
  }

  componentDidMount() {
    this.initScrollListener();
  }

  componentWillReceiveProps() {
    this.initScrollListener();
  }

  render() {
    const verticalScrollBase = ((!this.props.oneRow && this.props.scrollBase > 0) ? this.props.scrollBase : 0);
    const scrollTopWithoutBase = this.state.scrollTop - verticalScrollBase;
    const {galleryDomId} = this.props;
    return (
      <div key="css-scroll-indicator" data-hook="css-scroll-indicator" data-scroll-base={verticalScrollBase} data-scroll-top={this.state.scrollTop} className={cssScrollHelper.calcScrollClasses(galleryDomId, scrollTopWithoutBase)} style={{display: 'none'}} />
    );

  }

}
