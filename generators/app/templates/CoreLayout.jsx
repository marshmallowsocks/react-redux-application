import React from 'react';
import '../../dist/css/MainStyle.css';
import { Link } from 'react-router';

export const CoreLayout = React.createClass({
  render: function() {
    return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
        <ul className="nav navbar-nav navbar-right hidden-xs">
          <li>
            <img className="img-responsive img-padding-top-right" src="" alt="Your logo here"></img>
          </li>
        </ul>
        <div className="navbar-header">
          <Link to="/" className="navbar-brand hidden-xs"><i className="fa fa-home home"></i></Link>
          <Link to="/" className="navbar-brand hidden-sm hidden-md hidden-lg">
            <img className="img-responsive" src="" alt="Your logo here"></img>  
          </Link>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="true">
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <div className="navbar-collapse pull-left collapse in" id="navbar-collapse" aria-expanded="true">
          <ul className="nav navbar-nav">
            <%= routes %>
          </ul>
        </div>
      </div>
      </nav>
      <main>
        {this.props.children}
      </main>
  </div>
    );  
  }
});
