export function RegistrationForm() {
  return (
    <form>
      <div>
        <input autoComplete="username" name="username" placeholder="username" />
      </div>
      <div>
        <input name="password" placeholder="write a password" type="password" />
      </div>
      <div>
        <input name="password" placeholder="repeat the password" type="password" />
      </div>
      <footer>
        <button type="submit">Register</button>
      </footer>
    </form>
  );
}
