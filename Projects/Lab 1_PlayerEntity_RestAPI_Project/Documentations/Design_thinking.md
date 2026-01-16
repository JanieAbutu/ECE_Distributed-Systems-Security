## Mental Checklist Before Coding Any API
Think this in order every time:

### Step 1: What data do I need?
That tells you which models you need.
Player?
Team?
User?


### Step 2: What actions should users perform?
That defines your CRUD operations.
Create?
Read?
Update?
Delete?
Search?


### Step 3: Who is allowed to do what?
That tells you where to add middleware.
Public?
Logged-in users only?
Admin only?


### Step 4: What URLs make sense?
That defines your routes.
Examples:
/players
/players/:id
/players/team/:teamId
/auth/login

### Step 5: What logic happens inside?
That belongs in controllers.
Validate input
Hash password
Generate token
Look up team

### Step 6: What format goes in and out?
That’s your API contract.
Input: { "name": "Mbappe", "teamId": "..." }
Output: { "id": "...", "name": "Mbappe" }

## Golden Rule
If you cannot explain the flow in words, don’t write code yet.

## Real-World Analogy — Bank
Your backend is a bank system.

### Client = Customer
You walk into a bank and say:
“I want my account balance”

### Client = Customer
You walk into a bank and say:
“I want my account balance”

### Middleware = Security Guard
Security checks:
- Do you have ID?
- Is it valid?

❌ No → You’re stopped
✅ Yes → You may proceed

### Controller = Bank Officer
Officer:
- Understands what you want
- Knows bank rules
- Knows how to request data

### Model = Account Ledger Rules
Ledger defines:
- What an account contains
- How transactions are recorded
- What fields are required

### Database = Vault
The vault:
- Stores all accounts
- Stores all transactions
- Only opens when requested properly
 
### Response = Bank Statement
Officer prints your statement and hands it to you.

### JWT in Bank Terms
JWT = Access badge
- Issued after login
- Must be shown for every sensitive operation
- Expires automatically

### REMEMBER
Routes direct traffic
Middleware enforces rules
Controllers make decisions, 
Models define structure, 
Database remembers everything.