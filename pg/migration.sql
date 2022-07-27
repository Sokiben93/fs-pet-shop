-- [{"age":7,"kind":"rainbow","name":"fido"},{"age":5,"kind":"snake","name":"Buttons"},{"name":"Bingo","age":1,"kind":"hamster"}]

DROP TABLE IF EXISTS pets:

CREATE TABLE pets (id SERIAL PRIMARY KEY, age INTEGER, kind TEXT, name TEXT);

INSERT INTO pets (age, kind, name) VALUES (7,'rainbow','fido');
INSERT INTO pets (age, kind, name) VALUES (5,'snake','Buttons');
INSERT INTO pets (age, kind, name) VALUES (1,'hamster','Bingo');
