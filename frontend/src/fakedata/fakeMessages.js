const fakeMessages = [
    { id: 0, sender: { username: 'xiaomao', studentId: '508766' }, receiver: { username: 'Dijkstra', studentId: '508764' }, send_date: '2023-11-02 19:56:21', is_read: true, content: 'Hey, how are you doing?' },
    { id: 1, sender: { username: 'Dijkstra', studentId: '508764' }, receiver: { username: 'cx', studentId: '508765' }, send_date: '2023-10-31 18:21:57', is_read: false, content: "Let's meet tomorrow!" },
    { id: 2, sender: { username: 'xiaomao', studentId: '508766' }, receiver: { username: 'cx', studentId: '508765' }, send_date: '2023-11-09 18:00:41', is_read: true, content: 'Did you finish the assignment?' },
    { id: 3, sender: { username: 'xiaomao', studentId: '508766' }, receiver: { username: 'cx', studentId: '508765' }, send_date: '2023-11-08 08:26:35', is_read: true, content: "I'll be late for the meeting." },
    { id: 4, sender: { username: 'cx', studentId: '508765' }, receiver: { username: 'xiaomao', studentId: '508766' }, send_date: '2023-10-20 09:08:55', is_read: false, content: "I'll be late for the meeting." },
    { id: 5, sender: { username: 'xiaomao', studentId: '508766' }, receiver: { username: 'Dijkstra', studentId: '508764' }, send_date: '2023-11-14 15:34:28', is_read: true, content: 'Did you finish the assignment?' },
    { id: 6, sender: { username: 'xiaomao', studentId: '508766' }, receiver: { username: 'cx', studentId: '508765' }, send_date: '2023-10-26 18:49:59', is_read: true, content: 'Hey, how are you doing?' },
    { id: 7, sender: { username: 'Dijkstra', studentId: '508764' }, receiver: { username: 'cx', studentId: '508765' }, send_date: '2023-10-31 21:54:54', is_read: true, content: 'Can we reschedule our meeting?' },
    { id: 8, sender: { username: 'Dijkstra', studentId: '508764' }, receiver: { username: 'xiaomao', studentId: '508766' }, send_date: '2023-10-27 20:05:00', is_read: false, content: 'Hey, how are you doing?' },
    { id: 9, sender: { username: 'xiaomao', studentId: '508766' }, receiver: { username: 'Dijkstra', studentId: '508764' }, send_date: '2023-10-30 16:29:28', is_read: false, content: 'Hey, how are you doing?' }
];

export default fakeMessages;
