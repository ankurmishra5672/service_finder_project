# Local Services Finder

A web application for managing and discovering local services in your area. Built with React, Node.js, Express, and MongoDB.

## Features

- Add new service entries with details
- View services in a responsive grid layout
- Search services by pin code
- Real-time validation and error handling
- Responsive design for all devices

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Styling: Custom CSS
- Icons: Font Awesome

## Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/local-services-finder.git
cd local-services-finder
```

2. Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. Environment Setup
Create `.env.local` file in root directory:
```properties
VITE_API_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/local-services-finder
PORT=5000
NODE_ENV=development
```

4. Start the application
```bash
# Start backend (from root directory)
npm start

# Start frontend (from client directory)
npm run dev
```

## API Endpoints

- `GET /services` - Get all services
- `POST /services` - Add new service
- `GET /services/pin` - Get services by pin code
- `DELETE /services/name` - Delete service by name

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Live Demo
Frontend deployment: https://local-service-finder.netlify.app/

## License

MIT License - feel free to use this project for your own purposes.

## Development

This project was built with Vite and includes HMR (Hot Module Replacement) and ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
