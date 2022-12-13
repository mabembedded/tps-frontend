import React, { Component } from 'react';

var devices = []

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfDevices: 0,
    };
  }

  render() {

    if (this.state.numberOfDevices === 0) {
        return (
          <div>
			    <h1 className="title">MAB Labs IoT Dashboard</h1>
		      </div>
        )
    } else {
        return (
          <div>
			    <h1 className="title">MAB Labs IoT Dashboard</h1>
          <table>
                <tbody>
                <tr>
                  <th>Device Name</th>
                  <th>Device ID</th>
                  <th>Last Seen</th>
                  <th>Created</th>
                </tr>
                {devices.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.deviceName}</td>
                      <td>{val.deviceId}</td>
                      <td>{val.lastSeen}</td>
                      <td>{val.createdAt}</td>
                    </tr>
                  )
                })}
           </tbody>
           </table>
		      </div>
          )
      }
    }
      
  async componentDidMount() {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            };

            var obj;

            let num_devices = await fetch('http://192.168.86.58:5000/num-devices', requestOptions)
                .then(response => response.json())
                .then(data => {
                  obj = data
                });
          

            devices = []
            let number_of_devices = obj['total'];
            let total_devices = obj['values']
            for (var i=0; i < number_of_devices; i++)
                devices.push(total_devices[i])


            this.setState({
              numberOfDevices: number_of_devices
            });

          }    

}

export default App;
