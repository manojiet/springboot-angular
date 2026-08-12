-- Add phone column and remove username column to align with new DTO
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(30);
ALTER TABLE users DROP COLUMN IF EXISTS username;
