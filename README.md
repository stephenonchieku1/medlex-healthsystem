# MedLex Health System

A comprehensive health information system for managing clients and health programs/services.

Link to backend repository :
```bash
https://github.com/stephenonchieku1/medlex-healthsystem-backend
```
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


![med1](https://github.com/user-attachments/assets/de4ca739-d09b-4038-afcb-35c80d4dbf59)
![Screenshot 2025-04-27 004909](https://github.com/user-attachments/assets/88ef57ed-6cfb-4571-ae2c-70a1c64f4451)
image.png![Screenshot 2025-04-27 005025](https://github.com/user-attachments/assets/d1780260-7e76-427b-84f2-5cd690542d12)
![Screenshot 2025-04-27 005052](https://github.com/user-attachments/assets/f4de8938-8999-44bd-91d0-b4d07eb9eb9f)
![Screenshot 2025-04-27 005122](https://github.com/user-attachments/assets/027f6e54-d435-49b1-8821-4f8fec16dfd2)
![Screenshot 2025-04-27 005250](https://github.com/user-attachments/assets/ee82bfd5-7f0e-4746-885a-80397099bea0)
![Screenshot 2025-04-27 005315](https://github.com/user-attachments/assets/71d63eb4-c259-4f62-ac14-b5576b546437)
![Screenshot 2025-04-27 005518](https://github.com/user-attachments/assets/6abf0a14-4836-4f70-84a9-189f4fb61761)
![Screenshot 2025-04-27 005619](https://github.com/user-attachments/assets/c2bc642b-8262-40ad-b34a-c642207a47a3)
![Screenshot 2025-04-27 005648](https://github.com/user-attachments/assets/ed28a0af-c14b-4d54-b6b4-233e3d255abd)

## Deployment
The application can be deployed using:
- Heroku/render for backend
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

