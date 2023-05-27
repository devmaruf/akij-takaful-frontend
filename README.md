# Akij Takaful Life Insurance PLG

---

## Installation

1. Clone repository

```bash
https://github.com/WorkFortBD/akij-takaful-frontend.git
```

2. Go to the folder

```bash
cd akij-takaful-frontend
```

3. Install Node packages

```bash
npm i
```

4. Run Local server with development change watching...

```bash
npm run dev
```

5. Open browser

```bash
http://localhost:3000
```

## How to use the System

### Login, Authentication
1. Login With Username, Password and OTP [This is for All User (Super Admin, Bank Admin, Bank User, Akij Takaful User, Proposer)]
1. User can reset his password via Email or phone (Incoming feature)
1. There should be some default Designations and Roles

### Bank & branch Enlist
1. Admin can create new Bank
   - If selected from default banks, then all of the branches will also be enlisted.
   - Otherwise, just create the bank.
1. For otherwise case, means only one bank is added, 
   - User will create branch manually for this bank.

### Product & Rate Management
1. Can add some products from configuration
    - Can add rate in bulk according to given CSV

### Banca Manager / Officer Management
1. Create new Admin for a bank.
   - Select bank,
   - By default all branch for Bank admin
   - Password auto generated
   - Send Username and password in email / phone
1. Also can create normal agents with some specific branch permission
1. Try login with Banca Admin credential

### Banca Admin Features
1. Can create new Agent with specific branch permission


### Bank agent features
1. Can Login
1. Proposal Enlist
1. Worksheet list
1. New Worksheet
   - Click on New Worksheet
   - Under the hood, a proposal would be created for him.
