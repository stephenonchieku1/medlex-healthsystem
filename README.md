# MedLex Health System

A comprehensive health information system for managing clients and health programs/services.
Presentation slides Link : https://docs.google.com/presentation/d/1SoC5yrOK08Xu1R6m7F8dOVeLvX-eqckAJy5IKl8QXbY/edit?usp=sharing

## Features

1. **Health Program Management**
   - Create and manage health programs (TB, Malaria, HIV, etc.)
   - View program details and enrollment statistics
   - Update program information

2. **Client Management**
   - Register new clients with detailed information
   - Search for clients using various criteria
   - View client profiles and history
   - Update client information

3. **Program Enrollment**
   - Enroll clients in health programs
   - Track enrollment status and history
   - View client's enrolled programs

4. **API Integration**
   - RESTful API for all operations
   - Secure authentication and authorization
   - Comprehensive documentation

## Tech Stack

### Backend
- Ruby on Rails
- PostgreSQL database
- JWT authentication
- RSpec for testing

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Axios for API calls
- React Query for data management

## Getting Started

### Prerequisites
- Ruby 3.x
- Node.js 16.x
- PostgreSQL

### Backend Setup
```bash
cd medlex-healths
bundle install
rails db:create db:migrate
rails server
```

### Frontend Setup
```bash
cd medlex-healthsystem
npm install
npm run dev
```

## API Documentation

### Health Programs
- `GET /api/v1/health_programs` - List all programs
- `GET /api/v1/health_programs/:id` - Get program details
- `POST /api/v1/health_programs` - Create new program
- `PUT /api/v1/health_programs/:id` - Update program
- `DELETE /api/v1/health_programs/:id` - Delete program

### Clients
- `GET /api/v1/clients` - List all clients
- `GET /api/v1/clients/:id` - Get client details
- `POST /api/v1/clients` - Register new client
- `PUT /api/v1/clients/:id` - Update client
- `GET /api/v1/clients/search?q=:query` - Search clients
- `GET /api/v1/clients/:id/enrollments` - Get client's program enrollments

### Enrollments
- `POST /api/v1/enrollments` - Enroll client in program
- `PUT /api/v1/enrollments/:id` - Update enrollment status
- `GET /api/v1/enrollments/:id` - Get enrollment details

## Security Features
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Rate limiting

## Testing
```bash
# Backend tests
cd medlex-healths
bundle exec rspec

# Frontend tests
cd medlex-healthsystem
npm test
```
image.png
image.png
image.png
image.png
image.png
image.png
image.png
image.png
image.png

## Deployment
The application can be deployed using:
- Heroku for backend
- Vercel/Netlify for frontend
- AWS/GCP for production

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.
