from django.urls import path


from .views import UserRegisterAPI, UserLoginAPI, UserLogoutAPI, get_csrf_token, CheckUserAPI, CheckEmail


app_name = "auth"
urlpatterns = [
    path("register/", UserRegisterAPI.as_view(), name="register"),
    path("login/", UserLoginAPI.as_view(), name="login"),
    path("logout/", UserLogoutAPI.as_view(), name="logout"),
    path("get/csrf/", get_csrf_token, name="get_csrf"),
    path("check/", CheckUserAPI.as_view(), name="check_user"),
    path("check/username/", CheckEmail.as_view(), name="check_username"),
]
