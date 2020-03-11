# jarvis-task-butler-allot
This is a task in which a list of request is sent to the backend and a list of imaginary butler is sent back with the assigned butler to each task.
## To Run
1. Clone the repository
1. Run npm install on the root directory
1. Then run either npm start or npm run dev

### To test a custom json string
```json
[
  {
    "clientId":1,
    "requestId":"abc",
    "hours":6
  },
  {
    "clientId":2,
    "requestId":"ghi",
    "hours":1
  },
  {
    "clientId":1,
    "requestId":"def",
    "hours":4
  }
]
```
Please use a valid json string.
