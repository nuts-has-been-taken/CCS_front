import React from 'react';
import Rectangle from './Rectangle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faUpload } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      apiResponse: [],
    };
  }
  
  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  }

  handleReload = () => {
    fetch('http://127.0.0.1:8080/download')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          const apiResponse = data.data;
          this.setState({ apiResponse });
        }
      })
      .catch((error) => {
        console.error('API請求錯誤:', error);
      });
  }

  handleUpload = () => {
    const { selectedFile } = this.state;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://127.0.0.1:8080/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // 上传成功
            this.showNotification('上傳成功')
            console.log('上傳成功');
          } else {
            // 上传失败
            this.showNotification('上傳失敗')
            console.error('上傳失敗');
          }
          this.handleReload();
        })
        .catch((error) => {
          console.error('上傳請求錯誤:', error);
        });
    } else {
      console.error('沒有選擇文件');
    }
  }

  showNotification = (message) => {
    this.setState({
      isNotificationVisible: true,
      notificationMessage: message,
    });
    setTimeout(() => {
      this.hideNotification();
    }, 3000);
  }

  hideNotification = () => {
    this.setState({
      isNotificationVisible: false,
      notificationMessage: '',
    });
  }

  componentDidMount() {
    this.handleReload();
  }

  render() {
    const { apiResponse, isNotificationVisible, notificationMessage } = this.state;

    const headerStyle = {
      marginLeft: '20px', 
    };

    return (
      <div>
        <div className="header" style={headerStyle}>
          <h1>文件列表</h1>
          <button onClick={this.handleReload} >
            <FontAwesomeIcon icon={faRedo} /> 重新整理
          </button>
          <input type="file" onChange={this.handleFileChange} style={{ marginLeft: '10px' }}/> 
          <button onClick={this.handleUpload} >
            <FontAwesomeIcon icon={faUpload} /> 上傳檔案
          </button>
          {isNotificationVisible && (
          <div className="notification">
            <p>{notificationMessage}</p>
          </div>
          )}
        </div>
        <div>
          {apiResponse.map((item, index) => (
          <Rectangle
            key={index}
            color="white" 
            width={400} 
            height={50} 
            borderColor="black" 
            text={item} 
            downloadUrl={`http://127.0.0.1:8080/download/${item}`} 
          />
        ))}
        </div>
      </div>
    );
  }
}

export default App;
