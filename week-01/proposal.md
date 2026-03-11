# Beauty Salon Management System Proposal

## 1. Business Understanding

A beauty salon provides personal care services to customers such as haircuts, coloring, manicure, pedicure, and facial treatments. The salon operates through scheduled appointments where customers book specific services performed by employees.

The main business processes include customer registration, appointment scheduling, staff assignment, service delivery, and payment processing. These processes must be well organized to avoid scheduling conflicts and ensure efficient service delivery.

Without a software system, salons may face problems such as double bookings, lost customer records, scheduling confusion, and difficulty tracking payments and revenue.

The goal of the proposed system is to digitalize salon operations, improve scheduling accuracy, manage customer and employee data, simplify payments, and support business reporting.


## 2. Functional Features

The system should include customer management features to store personal information, contact details, and service history.

Appointment scheduling should allow staff to create, update, cancel, and view appointments.

Employee management should maintain employee records, working hours, and assigned services.

The system should support payments and billing by recording completed services and generating payment records.

Notifications may remind customers about upcoming appointments.

Reporting features should allow the owner to monitor revenue, popular services, and employee workload.


## 3. Domain Model (Conceptual)

The main entities in the system are Customer, Employee, Service, Appointment, and Payment.

Customer represents a salon client who can book multiple appointments.

Employee represents a staff member who performs salon services.

Service represents a beauty treatment offered by the salon.

Appointment links a customer, employee, and selected services at a specific date and time.

Payment records the financial transaction associated with an appointment.

Important relationships include:
- One customer can have many appointments
- One employee can perform many appointments
- One appointment belongs to one customer
- One appointment is assigned to one employee
- One appointment can include multiple services


## 4. Database Structure

Customers
- CustomerID
- FirstName
- LastName
- Phone
- Email

Employees
- EmployeeID
- FirstName
- LastName
- Role

Services
- ServiceID
- ServiceName
- Price
- Duration

Appointments
- AppointmentID
- CustomerID
- EmployeeID
- Date
- Time
- Status

Payments
- PaymentID
- AppointmentID
- Amount
- PaymentMethod
- PaymentDate


## 5. User Roles and Permissions

Owner / Administrator
- View, create, edit, and delete all data
- Manage employees and services
- View reports

Receptionist
- Create and manage appointments
- Manage customer information
- Record payments

Employee
- View assigned appointments
- Update appointment status

Customer (optional)
- Book appointments
- View personal booking history


## Conclusion

The proposed beauty salon management system would help improve organization, reduce manual errors, and enhance customer service. By managing appointments, employees, and payments digitally, the salon can operate more efficiently and make better business decisions.
