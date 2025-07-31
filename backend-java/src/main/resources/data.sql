-- Insert test users
INSERT INTO users (username, email, password, interests, profile_picture_url) VALUES 
('admin', 'admin@floresti.ro', '$2a$10$rQZ9vK9m9vK9m9vK9m9vK9m9vK9m9vK9m9vK9m9vK9m9vK9m9vK9', 'technology,community', 'https://example.com/admin.jpg'),
('testuser', 'test@floresti.ro', '$2a$10$rQZ9vK9m9vK9m9vK9m9vK9m9vK9m9vK9m9vK9m9vK9m9vK9m9vK9', 'events,business', 'https://example.com/user.jpg');

-- Insert test events
INSERT INTO event (title, description, flyer_url, location, date_time, created_at, created_by_id) VALUES 
('Festivalul Floresti', 'Cel mai mare festival al comunitatii', 'https://example.com/festival.jpg', 'Piata Centrala Floresti', '2024-08-15 18:00:00', NOW(), 1),
('Targul de Afaceri', 'Oportunitati de afaceri in Floresti', 'https://example.com/targ.jpg', 'Centrul Comercial Floresti', '2024-08-20 10:00:00', NOW(), 1);

-- Insert test local businesses
INSERT INTO local_business (name, description, category, location, contact_info, added_by_id) VALUES 
('Restaurantul Floresti', 'Cel mai bun restaurant din oras', 'Restaurant', 'Strada Principala 123', 'tel: 0264 123 456', 1),
('Farmacia Floresti', 'Farmacie de incredere', 'Farmacie', 'Strada Secundara 45', 'tel: 0264 456 789', 1);

-- Insert test community groups
INSERT INTO community_group (name, description, whatsapp_url, created_at, created_by_id) VALUES 
('Comunitatea Floresti', 'Grupul principal al comunitatii', 'https://wa.me/40123456789', NOW(), 1),
('Antreprenorii Floresti', 'Grup pentru antreprenori', 'https://wa.me/40987654321', NOW(), 1);

-- Insert test forum posts
INSERT INTO forum_post (title, content, anonymous, created_by_id, created_at) VALUES 
('Intrebare despre evenimente', 'Care sunt urmatoarele evenimente in oras?', false, 1, NOW()),
('Sugestii pentru oras', 'Ce ar trebui sa imbunatatim in Floresti?', false, 2, NOW());

-- Insert test news
INSERT INTO news (title, content, image_url, published_at, author_id) VALUES 
('Floresti in crestere', 'Orasul nostru se dezvolta rapid', 'https://example.com/news1.jpg', NOW(), 1),
('Noua biblioteca', 'Biblioteca va fi deschisa luna viitoare', 'https://example.com/news2.jpg', NOW(), 1); 