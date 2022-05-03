CREATE TABLE IF NOT EXISTS resolutions (
id UUID NOT NULL,
diagnosis VARCHAR(255),
purpose VARCHAR(255),
appointment_id UUID,
PRIMARY KEY (id),
FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE ON UPDATE CASCADE);