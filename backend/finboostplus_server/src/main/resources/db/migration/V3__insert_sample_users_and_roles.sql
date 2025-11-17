
INSERT INTO users (id, active, created_at, e_mail, user_name, password, theme_color)
VALUES
(1, true, '2025-11-17 18:36:42.585993-03', 'bruno@gmail.com',     'Bruno',     '$2a$10$9w8v.gW8Aq9Z8Kp0DkUHI.2xP3Z/jOCIDWsP3v6lHvfUNNbbxovHW', '#FFF'),
(2, true, '2025-11-17 18:36:42.585993-03', 'joao@gmail.com',      'Joao',      '$2a$10$9w8v.gW8Aq9Z8Kp0DkUHI.2xP3Z/jOCIDWsP3v6lHvfUNNbbxovHW', '#FFF'),
(3, true, '2025-11-17 18:36:42.585993-03', 'cristiano@gmail.com', 'Cristiano', '$2a$10$9w8v.gW8Aq9Z8Kp0DkUHI.2xP3Z/jOCIDWsP3v6lHvfUNNbbxovHW', '#FFF'),
(4, true, '2025-11-17 18:36:42.585993-03', 'alan@gmail.com',      'Alan',      '$2a$10$9w8v.gW8Aq9Z8Kp0DkUHI.2xP3Z/jOCIDWsP3v6lHvfUNNbbxovHW', '#FFF'),
(5, true, '2025-11-17 18:36:42.585993-03', 'cleyton@gmail.com',   'Cleyton',   '$2a$10$9w8v.gW8Aq9Z8Kp0DkUHI.2xP3Z/jOCIDWsP3v6lHvfUNNbbxovHW', '#FFF');


INSERT INTO users_roles (user_id, role_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);
