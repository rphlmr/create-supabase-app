-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  "createdAt" timestamp default current_timestamp,
  "updatedAt" timestamp,
  email text unique,

  primary key (id)
);