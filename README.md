# Performance Monitor

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Welcome to Performance Monitor, a full-stack application designed to track and monitor server performance in real-time. The application consists of a user-friendly React-based frontend and a powerful backend server built with Node.js, Socket.IO, MongoDB, and Redis. This README provides an overview of the application's features, installation instructions, and highlights its potential.

## Features

- **Real-Time Monitoring**: Performance Monitor provides real-time monitoring of registered servers, allowing users to track server information and performance data in real-time. The intuitive user interface presents the data in a visually appealing and easy-to-understand format.

- **Flexible and Scalable**: The backend server, built with Node.js, Socket.IO, MongoDB, and Redis, can be installed on any machine, enabling users to monitor multiple servers from a single frontend application. The application is designed to be flexible and scalable, accommodating the monitoring needs of various environments.

- **Performance Metrics**: Performance Monitor captures essential server performance metrics, including CPU usage, memory usage, disk usage, and network activity. These metrics provide valuable insights into server health and performance.

- **Alerts and Notifications**: The application offers customizable alerts and notifications, allowing users to set threshold values for performance metrics. When a metric exceeds the defined threshold, the system triggers alerts and sends notifications to keep users informed about critical server conditions.

## Installation

To set up Performance Monitor, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/manickjamadar/performance-monitor.git

2. Install the necessary dependencies for the frontend:
   ```shell
   cd frontend
   npm install

3. Install the necessary dependencies for the backend:
   ```shell
   cd backend
   npm install
   
4. Configure the backend server by updating the .env file with your MongoDB and Redis credentials.
5. Start the frontend and backend servers:
   ```shell
    # Start the frontend server
    cd frontend
    npm start

    # Start the backend server
    cd backend
    npm start

6. Access the application in your web browser at http://localhost:3000.

For detailed instructions and additional setup options, please refer to the project's documentation in the respective frontend and backend directories.

## Contributing
Contributions to Performance Monitor are more than welcome! If you encounter any bugs, have suggestions for improvements, or would like to contribute in any way, please [create an issue](https://github.com/manickjamadar/performance-monitor/issues) or submit a pull request.

## License
Performance Monitor is open-source and released under the MIT License. Feel free to use, modify, and distribute this project as per the terms of the license.

## Contact
If you have any questions or inquiries about Performance Monitor, please feel free to contact me at [contact@manickjamadar.com](mailto:contact@manickjamadar.com). I'm always excited to discuss potential collaborations or new opportunities.

Thank you for considering Performance Monitor. I hope this application demonstrates my skills and passion for full-stack development. I look forward to the opportunity of working together and contributing to future projects.
