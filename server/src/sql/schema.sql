-- NOTE: I figured we'd want this for the section on SQL
PRAGMA foreign_keys;

-- NOTE: For the SQL assignment, we could have them normalize
-- this database farther. Perhaps they can learn about SERIAL and
-- then go implement a way to change a room_name without losing
-- references by using a FOREIGN KEY into a rooms table with an 
-- int primary key.

CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES 	(1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'), 
		(2, 'Song of Storms', 'D3 F3 D4 D3 F3 D4 E4 F4 E4 F4 E4 C4 A3 A3 D3 F3 G3 A3 A3 D3 F3 G3 E3'),
		(3, 'Mission Impossible', 'G2, G2, Bb2, C3, G2, G2, F2, F#2, G2, G2, Bb2, C3, G2, G2, F2, F#2'),
		(4, 'Yankee Doodle Remix', 'C4 C4 D4 E4 C4 E4 D4 G4 C4 C4 D4 E4 C4 B4 G4 C4 C4 D4 E4 F4 E4 D4 C4 B4 G4 A4 B4 C4 C4 A4 B4 A4 G4 A4 B4 C4 G4 A4 G4 F4 E4 G4 A4 B4 A4 G4 A4 B4 C4 A4 G4 C4 B4 D4 C4 C4'),
		(5, 'Twinkle Twinkle Little Star', 'C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4 G4 G4 F4 F4 E4 E4 D4 G4 G4 F4 F4 E4 E4 D4 C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4'),
		(6, 'Marry Had a Little Lamb', 'E4 D4 C4 D4 E4 E4 E4 D4 D4 D4 E4 E4 E4 E4 D4 C4 D4 E4 E4 E4 C4 D4 D4 E4 D4 C4'),
		(30, 'Super Mario', 'E4 E4 E4 C4 E4 G4 C4 G4 E4 A4 B4 B4 A4 G4 E4 G4 A4 F4 G4 E4 C4 D4 B4');