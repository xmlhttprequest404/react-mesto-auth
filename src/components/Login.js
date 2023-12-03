function Login () {

  return (
    <>
      <div className="authorization">
          <form action="#" method="POST" name="login" className={`authorization__form`} noValidate >
            <h2 className="authorization__title">Вход</h2>
            <fieldset className="authorization__set">
            <label className="authorization__field">
        <input type="text"
               name="email"
               placeholder="Email"
               className={`authorization__input authorization__input_name`}
               id="name-input"
               minLength="2"
               maxLength="40"
               required/>
        <span className={`name-input-error`}></span>
    </label>
    <label className="authorization__field">
        <input type="text"
               name="about"
               placeholder="Пароль"
               className={`authorization__input authorization__input_occupation`}
               id="occupation-input"
               minLength="2"
               maxLength="200"
               required
               />
        <span className={`occupation-input-error`}></span>
    </label>
            </fieldset>
            <button type="submit"
              className={`authorization__submit `}
              aria-label="Кнопка сохранить">
              Войти<span></span>
            </button>
          </form>
      </div>
    </>
  );
}

export default Login;
