export function NewPostForm() {
  return <form className="new-post" style={{ display: 'none' }}>
    <fieldset role="group">
      <textarea name="text" placeholder="What's on your mind?" maxLength={100} />
      <input type="submit" value="Post" />
    </fieldset>
  </form>;
}
