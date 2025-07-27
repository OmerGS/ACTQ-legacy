use actq;

SELECT * FROM Member;
SELECT * FROM Role;
SELECT * FROM verification_codes;

INSERT INTO Role (name, label, description) VALUES
('admin', 'Administrator', 'Full access to all application features'),
('moderator', 'Moderator', 'Can manage members, payments and documents'),
('operator', 'Operator', 'Can register payments and manage own data'),
('viewer', 'Viewer', 'Can view data only'),
('member', 'Member', 'Standard user with limited access');

INSERT INTO Permission (name, label, description) VALUES
('view_system_info', 'View System Info', 'Access system configuration and debug info'),
('view_members', 'View Members', 'Can view all members'),
('edit_members', 'Edit Members', 'Can edit member info'),
('add_members', 'Add New Member', 'Can register new members'),
('view_payments', 'View Payments', 'Can see payment history'),
('add_payments_all', 'Add Any Payment', 'Can add payment for anyone'),
('add_payments_outside_family', 'Add Outside-Family Payment', 'Can add payment for unrelated members'),
('delete_own_payments', 'Delete Own Payments', 'Can delete own payments within 15 minutes'),
('delete_any_payments', 'Delete Any Payments', 'Can delete any payments'),
('manage_documents', 'Manage Documents', 'Can upload and manage documents'),
('view_settings', 'View Settings', 'Can see global settings'),
('edit_settings', 'Edit Settings', 'Can change global settings'),
('send_announcements', 'Send Announcements', 'Can send popup messages'),
('edit_social_links', 'Edit Social Links', 'Can manage social network links'),
('view_year_contributions', 'View Yearly Contributions', 'Can see yearly contribution overview'),
('view_year_funeral_fund', 'View Yearly Funeral Fund', 'Can see yearly funeral fund overview'),
('grant_permissions', 'Grant Permissions', 'Can assign or remove permissions'),
('create_poll', 'Create Poll', 'Can create polls'),
('view_poll_results', 'View Poll Results', 'Can view poll results');


INSERT INTO Aidat (category, price) 
VALUES 
  ('Genç', 100.00),  
  ('Normal', 240.00),  
  ('Emekli', 100.00);