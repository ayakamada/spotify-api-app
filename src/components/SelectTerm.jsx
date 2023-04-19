export default function SelectTerm() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn m-1">
        SELECT TERM
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black">
        <li>
          <a>SHORT</a>
        </li>
        <li>
          <a>LONG</a>
        </li>
      </ul>
    </div>
  );
}
