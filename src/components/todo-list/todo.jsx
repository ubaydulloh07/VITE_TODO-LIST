import { useState, useEffect } from "react";
import "./todo.css";

export default function VazifaDasturi() {
  const [vazifalar, setVazifalar] = useState(() => {
    const saqlanganVazifalar = localStorage.getItem("vazifalar");
    return saqlanganVazifalar ? JSON.parse(saqlanganVazifalar) : [];
  });
  const [modalOchiq, setModalOchiq] = useState(false);
  const [formaMalumotlari, setFormaMalumotlari] = useState({
    id: "",
    ism: "",
    email: "",
    yosh: "",
    jins: "Erkak",
    shartlarQabul: false,
    holat: "Bajarilmagan"
  });
  const [tahrirIndex, setTahrirIndex] = useState(null);

  useEffect(() => { 
    localStorage.setItem("vazifalar", JSON.stringify(vazifalar));
  }, [vazifalar]);

  const oZgarish = (e) => {
    const { name, value, type, checked } = e.target;
    setFormaMalumotlari({
      ...formaMalumotlari,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const yuborish = (e) => {
    e.preventDefault();
    if (tahrirIndex !== null) {
      const yangilanganVazifalar = [...vazifalar];
      yangilanganVazifalar[tahrirIndex] = formaMalumotlari;
      setVazifalar(yangilanganVazifalar);
      setTahrirIndex(null);
    } else {
      setVazifalar([...vazifalar, { ...formaMalumotlari, id: Date.now() }]);
    }
    setFormaMalumotlari({ id: "", ism: "", email: "", yosh: "", jins: "Erkak", shartlarQabul: false, holat: "Bajarilmagan" });
    setModalOchiq(false);
  };

  const tahrirlash = (index) => {
    setFormaMalumotlari(vazifalar[index]);
    setTahrirIndex(index);
    setModalOchiq(true);
  };

  const ochirish = (index) => {
    setVazifalar(vazifalar.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h1>TODO_LIST</h1>
      <div>
      <button className="add-task-btn" onClick={() => setModalOchiq(true)}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Ism</th>
            <th>Email</th>
            <th>Yosh</th>
            <th>Jins</th>
            <th>Qabul qilingan shartlar</th>
            <th>Holat</th>
            <th>Tahrirlash</th>
            <th>O‘chirish</th>
          </tr>
        </thead>
        <tbody>
          {vazifalar.map((vazifa, index) => (
            <tr key={vazifa.id}>
              <td>{vazifa.id}</td>
              <td>{vazifa.ism}</td>
              <td>{vazifa.email}</td>
              <td>{vazifa.yosh}</td>
              <td>{vazifa.jins}</td>
              <td>{vazifa.shartlarQabul ? "Ha" : "Yo'q"}</td>
              <td className={`holat ${vazifa.holat.toLowerCase()}`}>{vazifa.holat}</td>
              <td>
                <button className="tahrir-btn" onClick={() => tahrirlash(index)}>edit</button>
              </td>
              <td>
                <button className="ochirish-btn" onClick={() => ochirish(index)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOchiq && (
        <div className="modal">
          <div className="modal-content">
            <h2>{tahrirIndex !== null ? "Vazifani tahrirlash" : "Vazifa qo‘shish"}</h2>
            <form onSubmit={yuborish}>
              <input type="text" name="ism" value={formaMalumotlari.ism} onChange={oZgarish} placeholder="Ism" required />
              <input type="email" name="email" value={formaMalumotlari.email} onChange={oZgarish} placeholder="Email" required />
              <input type="number" name="yosh" value={formaMalumotlari.yosh} onChange={oZgarish} placeholder="Yosh" required />
              <select name="jins" value={formaMalumotlari.jins} onChange={oZgarish}>

                <option value="Erkak">Erkak</option>
                <option value="Ayol">Ayol</option>
              </select>
              <label>
                <input type="checkbox" name="shartlarQabul" checked={formaMalumotlari.shartlarQabul} onChange={oZgarish} /> Shartlarni qabul qilaman
              </label>
              <select name="holat" value={formaMalumotlari.holat} onChange={oZgarish}>
                <option value="Bajarilmagan">Bajarilmagan</option>
                <option value="Jarayonda">Jarayonda</option>
                <option value="Tugallangan">Tugallangan</option>
              </select>
              <button type="submit">{tahrirIndex !== null ? "Yangilash" : "Qo‘shish"}</button>
              <button type="button" className="bekor-qilish-btn" onClick={() => setModalOchiq(false)}>Bekor qilish</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
