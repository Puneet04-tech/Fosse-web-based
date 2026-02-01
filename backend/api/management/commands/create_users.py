from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Create default users for the equipment monitoring system'

    def handle(self, *args, **options):
        # Create admin user
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')
            self.stdout.write(self.style.SUCCESS('✅ Created admin user: admin/adminpass'))
        else:
            self.stdout.write(self.style.WARNING('⚠️ Admin user already exists'))

        # Create demo user
        if not User.objects.filter(username='demo').exists():
            User.objects.create_user('demo', 'demo@example.com', 'demo123')
            self.stdout.write(self.style.SUCCESS('✅ Created demo user: demo/demo123'))
        else:
            self.stdout.write(self.style.WARNING('⚠️ Demo user already exists'))

        # Create test user
        if not User.objects.filter(username='test').exists():
            User.objects.create_user('test', 'test@example.com', 'test123')
            self.stdout.write(self.style.SUCCESS('✅ Created test user: test/test123'))
        else:
            self.stdout.write(self.style.WARNING('⚠️ Test user already exists'))

        self.stdout.write(self.style.SUCCESS('🎉 All users created successfully!'))
