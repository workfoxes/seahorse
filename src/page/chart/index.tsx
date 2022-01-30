import React from 'react';
import Title from 'antd/lib/typography/Title';



export default class HomeComponent extends React.Component {
  public render() {
    return (
      <div className="home-wrapper">
        <Title level={2}>Welcome to TapCoin</Title>
      </div>
    );
  }
}