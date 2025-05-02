from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_features):

        if not email:
            raise ValueError("Email must be set!")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_features
        )

        user.set_password(password)
        user.save(using=self._db)
        return user



    def create_superuser(self, email, password, **extra_features):
        extra_features.setdefault('is_admin', True)
        extra_features.setdefault('is_superuser', True)
        extra_features.setdefault('is_active', True)

        if extra_features.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')
        if extra_features.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_features)


class User(AbstractBaseUser):

    email = models.EmailField(
        verbose_name="Email Address",
        max_length=200,
        unique=True
    )

    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, perm, obj=None):
        return True

    @property
    def is_staff(self):
        return self.is_admin
