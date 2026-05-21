# Schedora
### Remote Appointment-Based Business Management System

Schedora is a responsive web platform built to solve the core operational challenges faced by remote appointment-based businesses — salons, barbershops, spas, garages, and similar service-oriented businesses. It enables business owners to manage appointments remotely, prevent double-booking conflicts, monitor staff schedules, and view real-time analytics from any device.

---

## Table of Contents

- [Overview](#overview)
- [Core Problems Solved](#core-problems-solved)
- [User Roles](#user-roles)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Milestones](#project-milestones)

---

## Overview

Schedora centralizes scheduling, staff coordination, and customer management into a single platform. It serves three distinct user roles — **Owner**, **Staff**, and **Customer** — each with a tailored experience and access level.

The public-facing homepage acts as a marketing and onboarding entry point, while authenticated users are routed into role-specific dashboards with appropriate access controls.

---

## Core Problems Solved

**Double Booking Conflicts**
Manual scheduling often leads to overlapping appointments. Schedora resolves this by checking staff availability, occupied schedules, and appointment duration before confirming any booking.

**Remote Business Monitoring**
Owners can monitor their business from anywhere with real-time booking visibility, appointment tracking, staff schedule oversight, and daily/weekly revenue reports.

**Disorganized Customer Management**
Customer data scattered across notebooks, calls, and messaging apps is consolidated into centralized profiles with full appointment history and booking records.

**Poor Staff Coordination**
Staff scheduling confusion is eliminated through dedicated schedule views, appointment assignments, and availability tracking.

---

## User Roles

| Role | Access & Responsibilities |
|---|---|
| **Customer** | Browse services, book appointments, receive confirmations, manage/cancel bookings, view booking history, leave reviews |
| **Staff** | View personal schedule, update availability, mark appointments as completed or no-show, receive booking notifications |
| **Owner** | Full platform access: manage all bookings, add/remove staff, configure services & pricing, view analytics, resolve conflicts remotely |

### Page Flow by Role

| Role | Journey |
|---|---|
| Visitor | Home → Book Now → Login/Register → Booking Form |
| Customer | Login → My Bookings → Add/Edit/Delete → Leave Review |
| Staff | Login → My Schedule → Attendance Submission → Notification Panel |
| Owner | Login → Dashboard → Bookings / Staff Schedule / Reviews / Analysis |

---

## Features

### Public Homepage
- Persistent navigation with a prominent **Book Now** CTA (always visible on mobile)
- Hero section with tagline and secondary CTA
- Interactive service card grid with icons, descriptors, and hover animations
- Value proposition section: Fast Booking, Verified Staff, Easy Rescheduling, Instant Confirmation
- Customer testimonials/review strip
- Footer with Terms, Privacy Policy, Contact, and social links

### Authentication & Access Control
- Role-based login; users select or are assigned a role at registration
- Owners create and manage staff accounts from their dashboard
- Customers self-register via the public booking page
- JWT-based session management prevents cross-role module access

### Owner Dashboard
- Summary cards: Total Bookings Today, Revenue This Week, Active Staff, Pending Reviews
- Calendar and list view of all bookings with filtering by date, service, staff, and status
- Ability to manually create, edit, or cancel bookings
- Weekly/monthly staff schedule grid with availability overrides
- Customer review management with filter by staff, service, rating, or date
- Analytics: booking volume trends, revenue by service and staff, cancellation/no-show rates, top performers, customer retention
- Exportable reports in CSV or PDF format

### Staff Portal
- Upcoming appointments with customer name, service, date, and time
- Weekly calendar view with visual distinction between booked, available, and blocked slots
- Availability submission up to 7 days in advance (feeds directly into the booking engine)
- Real-time notifications for new bookings, cancellations, and reschedules
- Optional daily digest of upcoming appointments

### Customer Portal
- Guided booking form: service type → date → time → staff → optional notes
- Booking actions: Add, Edit, Cancel (with confirmation prompt)
- Booking history with status badges: Upcoming, Completed, Cancelled
- Post-appointment review prompt with star rating (1–5) and optional written comment
- Personal review history

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vue.js with Pico CSS |
| **Backend** | Node.js |
| **Database** | PostgreSQL |
| **Notifications** | SendGrid (email) + WebSocket (in-app) |
| **Authentication** | Role-based JWT tokens |
| **Hosting** | Vercel (cloud deployment) |
| **Version Control** | Git + GitHub with CI/CD pipeline |

---

## Project Milestones

| Phase | Milestone | Duration |
|---|---|---|
| Phase 1 | Requirements finalization, wireframes, and UI design | 2 Weeks |
| Phase 2 | Backend API development (auth, bookings, users, notifications) | 3 Weeks |
| Phase 3 | Frontend development — Public site + Customer portal | 3 Weeks |
| Phase 4 | Staff portal and availability engine | 2 Weeks |
| Phase 5 | Owner dashboard and analytics module | 2 Weeks |
| Phase 6 | Testing and bug fixes | 2 Weeks |
| Phase 7 | Deployment, documentation, and handover | 1 Week |

**Total estimated duration: ~15 Weeks**

---

> Built for service businesses that need to run smarter, not harder.


## 👤 Authors
- *Claris Wega* — Software Development student, passionate about building smarter, data‑driven solutions.  
- *Elizabeth Ndiritu* - Computer Science Student | Frontend developer.
