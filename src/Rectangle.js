import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload} from '@fortawesome/free-solid-svg-icons';

class Rectangle extends React.Component {
  handleDownloadClick = () => {
    window.location.href = this.props.downloadUrl;
    };

  render() {
    const { color, width, height, borderColor, text} = this.props;
    const style = {
      backgroundColor: color,
      width: `${width}px`,
      height: `${height}px`,
      margin: '5px',
      border: `2px solid ${borderColor}`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5px',
      marginLeft: '20px',
    };

    const iconStyle = {
        cursor: 'pointer',
        marginLeft: '20px',
    };

    return (
    <div style={style}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{text}</span>
          <FontAwesomeIcon
            icon={faDownload}
            size="2x"
            style={iconStyle}
            onClick={this.handleDownloadClick}
          />
        </div>
    </div>);
  }
}

export default Rectangle;