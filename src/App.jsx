import { useState } from "react";

const COLORS = {
  primary: "#102A43",
  primaryLight: "#1e3f5a",
  primaryDark: "#0a1c2e",
  accent: "#27ae60",
  accentLight: "#2ecc71",
  accentDark: "#1e8449",
  white: "#ffffff",
  offWhite: "#f8fafc",
  gray100: "#f1f5f9",
  gray200: "#e2e8f0",
  gray300: "#cbd5e1",
  gray400: "#94a3b8",
  gray500: "#64748b",
  gray600: "#475569",
  gray700: "#334155",
  gray800: "#1e293b",
  danger: "#e74c3c",
  warning: "#f39c12",
  gold: "#f1c40f",
};

// TODO: Reemplazar con datos reales de una API de recetas
const CATEGORIAS = [
  { id: "todos", label: "Todos", emoji: "🍽️" },
  { id: "desayunos", label: "Desayunos", emoji: "🌅" },
  { id: "almuerzos", label: "Almuerzos", emoji: "🥗" },
  { id: "cenas", label: "Cenas", emoji: "🌙" },
  { id: "snacks", label: "Snacks", emoji: "🍎" },
  { id: "postres", label: "Postres", emoji: "🍮" },
  { id: "bebidas", label: "Bebidas", emoji: "🥤" },
];

// TODO: Reemplazar con datos reales del backend
const RECETAS = [
  {
    id: 1,
    titulo: "Tostadas de Aguacate con Huevo",
    categoria: "desayunos",
    tiempo: 15,
    calorias: 320,
    porciones: 2,
    dificultad: "Fácil",
    premium: false,
    valoracion: 4.8,
    imagen: "https://via.placeholder.com/400x250/27ae60/ffffff?text=🥑+Tostadas",
    descripcion: "Desayuno nutritivo y delicioso con pan integral, aguacate fresco y huevo poché.",
    ingredientes: ["2 rebanadas pan integral", "1 aguacate maduro", "2 huevos", "Limón al gusto", "Sal y pimienta", "Semillas de chía"],
    tags: ["vegetal", "proteínas", "omega-3"],
    macros: { proteinas: 18, carbos: 32, grasas: 22 },
  },
  {
    id: 2,
    titulo: "Bowl de Quinoa y Verduras",
    categoria: "almuerzos",
    tiempo: 25,
    calorias: 450,
    porciones: 2,
    dificultad: "Fácil",
    premium: false,
    valoracion: 4.6,
    imagen: "https://via.placeholder.com/400x250/1e8449/ffffff?text=🥗+Bowl+Quinoa",
    descripcion: "Bowl completo con quinoa, verduras asadas y aderezo de tahini.",
    ingredientes: ["200g quinoa", "Brócoli", "Zanahoria", "Pimiento rojo", "Tahini", "Limón", "Aceite de oliva"],
    tags: ["vegano", "sin gluten", "alto en fibra"],
    macros: { proteinas: 16, carbos: 58, grasas: 14 },
  },
  {
    id: 3,
    titulo: "Salmón al Horno con Espárragos",
    categoria: "cenas",
    tiempo: 30,
    calorias: 520,
    porciones: 2,
    dificultad: "Media",
    premium: true,
    valoracion: 4.9,
    imagen: "https://via.placeholder.com/400x250/102A43/ffffff?text=🐟+Salmón",
    descripcion: "Salmón fresco al horno con espárragos crujientes y limón.",
    ingredientes: ["2 filetes salmón", "1 manojo espárragos", "Limón", "Ajo", "Aceite de oliva", "Hierbas provenzales"],
    tags: ["omega-3", "proteínas", "sin gluten"],
    macros: { proteinas: 42, carbos: 12, grasas: 28 },
  },
  {
    id: 4,
    titulo: "Batido Verde Energizante",
    categoria: "bebidas",
    tiempo: 5,
    calorias: 180,
    porciones: 1,
    dificultad: "Fácil",
    premium: false,
    valoracion: 4.5,
    imagen: "https://via.placeholder.com/400x250/2ecc71/ffffff?text=🥤+Batido+Verde",
    descripcion: "Batido refrescante con espinacas, manzana y jengibre.",
    ingredientes: ["1 puñado espinacas", "1 manzana verde", "1 plátano", "Jengibre fresco", "Agua de coco"],
    tags: ["vegano", "detox", "vitaminas"],
    macros: { proteinas: 4, carbos: 38, grasas: 2 },
  },
  {
    id: 5,
    titulo: "Hummus Casero con Crudités",
    categoria: "snacks",
    tiempo: 10,
    calorias: 220,
    porciones: 4,
    dificultad: "Fácil",
    premium: false,
    valoracion: 4.7,
    imagen: "https://via.placeholder.com/400x250/e67e22/ffffff?text=🧆+Hummus",
    descripcion: "Hummus cremoso casero acompañado de palitos de verduras frescas.",
    ingredientes: ["400g garbanzos cocidos", "Tahini", "Ajo", "Limón", "Aceite de oliva", "Pimentón", "Zanahoria y pepino"],
    tags: ["vegano", "proteínas vegetales", "sin gluten"],
    macros: { proteinas: 10, carbos: 24, grasas: 12 },
  },
  {
    id: 6,
    titulo: "Mousse de Chocolate Negro",
    categoria: "postres",
    tiempo: 20,
    calorias: 280,
    porciones: 4,
    dificultad: "Media",
    premium: true,
    valoracion: 4.8,
    imagen: "https://via.placeholder.com/400x250/4a235a/ffffff?text=🍫+Mousse",
    descripcion: "Mousse de chocolate 70% cacao, ligero y sin azúcar refinada.",
    ingredientes: ["200g chocolate 70%", "3 claras de huevo", "Stevia", "Esencia de vainilla", "Frambuesas para decorar"],
    tags: ["sin azúcar", "antioxidantes", "bajo en carbos"],
    macros: { proteinas: 8, carbos: 22, grasas: 18 },
  },
  {
    id: 7,
    titulo: "Pollo al Curry con Arroz Integral",
    categoria: "almuerzos",
    tiempo: 40,
    calorias: 580,
    porciones: 3,
    dificultad: "Media",
    premium: false,
    valoracion: 4.7,
    imagen: "https://via.placeholder.com/400x250/d35400/ffffff?text=🍛+Curry+Pollo",
    descripcion: "Curry aromático de pollo con leche de coco y arroz integral.",
    ingredientes: ["500g pechuga pollo", "Leche de coco", "Curry en polvo", "Cebolla", "Tomate", "Arroz integral", "Cilantro"],
    tags: ["proteínas", "especiado", "sin gluten"],
    macros: { proteinas: 38, carbos: 52, grasas: 16 },
  },
  {
    id: 8,
    titulo: "Tortilla Española Saludable",
    categoria: "cenas",
    tiempo: 25,
    calorias: 380,
    porciones: 4,
    dificultad: "Fácil",
    premium: false,
    valoracion: 4.6,
    imagen: "https://via.placeholder.com/400x250/f39c12/ffffff?text=🥚+Tortilla",
    descripcion: "Versión ligera de la tortilla española con patata y cebolla.",
    ingredientes: ["4 huevos", "2 patatas medianas", "1 cebolla", "Aceite de oliva", "Sal y pimienta"],
    tags: ["vegetariano", "proteínas", "económico"],
    macros: { proteinas: 22, carbos: 30, grasas: 18 },
  },
  {
    id: 9,
    titulo: "Granola Casera con Frutos Secos",
    categoria: "desayunos",
    tiempo: 35,
    calorias: 290,
    porciones: 8,
    dificultad: "Fácil",
    premium: true,
    valoracion: 4.9,
    imagen: "https://via.placeholder.com/400x250/8e44ad/ffffff?text=🌾+Granola",
    descripcion: "Granola crujiente horneada con miel, avena y mezcla de frutos secos.",
    ingredientes: ["300g avena", "Almendras", "Nueces", "Miel", "Aceite de coco", "Canela", "Pasas"],
    tags: ["sin azúcar refinada", "energético", "fibra"],
    macros: { proteinas: 8, carbos: 42, grasas: 14 },
  },
];

// TODO: Conectar con sistema de planes de nutrición del backend
const PLANES = [
  {
    id: 1,
    nombre: "Plan Básico",
    precio: "Gratis",
    descripcion: "Acceso a recetas básicas",
    features: ["50+ recetas gratuitas", "Filtros básicos", "Lista de ingredientes"],
    color: COLORS.accent,
    popular: false,
  },
  {
    id: 2,
    nombre: "Plan Premium",
    precio: "€9.99/mes",
    descripcion: "Recetario completo + planes",
    features: ["300+ recetas premium", "Plan nutricional personalizado", "Macros detallados", "Listas de compra", "Soporte prioritario"],
    color: COLORS.primary,
    popular: true,
  },
  {
    id: 3,
    nombre: "Plan Anual",
    precio: "€79.99/año",
    descripcion: "Todo Premium + ahorra 33%",
    features: ["Todo lo de Premium", "Consulta con nutricionista", "Recetas exclusivas", "App sin publicidad"],
    color: COLORS.accentDark,
    popular: false,
  },
];

// ── Componente Estrella de Valoración ──────────────────────────────
function Estrellas({ valor }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            color: i <= Math.round(valor) ? COLORS.gold : COLORS.gray300,
            fontSize: 12,
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: 11, color: COLORS.gray500, marginLeft: 2 }}>
        {valor}
      </span>
    </span>
  );
}

// ── Badge de dificultad ──────────────────────────────────────────
function BadgeDificultad({ dificultad }) {
  const colores = {
    Fácil: { bg: "#d4edda", color: "#155724" },
    Media: { bg: "#fff3cd", color: "#856404" },
    Difícil: { bg: "#f8d7da", color: "#721c24" },
  };
  const c = colores[dificultad] || colores.Fácil;
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        borderRadius: 20,
        padding: "2px 8px",
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {dificultad}
    </span>
  );
}

// ── Card de Receta ───────────────────────────────────────────────
function CardReceta({ receta, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(receta)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.white,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 12px 40px rgba(16,42,67,0.18)"
          : "0 2px 12px rgba(16,42,67,0.08)",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
        position: "relative",
      }}
    >
      {/* Imagen */}
      <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
        <img
          src={receta.imagen}
          alt={receta.titulo}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
        {receta.premium && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "linear-gradient(135deg, #f1c40f, #e67e22)",
              color: "#fff",
              borderRadius: 20,
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            ⭐ Premium
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
          }}
        />
      </div>

      {/* Contenido */}
      <div style={{ padding: "14px 16px" }}>
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: 15,
            fontWeight: 700,
            color: COLORS.primary,
            lineHeight: 1.3,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {receta.titulo}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <BadgeDificultad dificultad={receta.dificultad} />
          <Estrellas valor={receta.valoracion} />
        </div>

        <p
          style={{
            margin: "0 0 12px",
            fontSize: 12,
            color: COLORS.gray600,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {receta.descripcion}
        </p>

        {/* Info rápida */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0 0",
            borderTop: `1px solid ${COLORS.gray100}`,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16 }}>⏱️</div>
            <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>
              {receta.tiempo} min
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16 }}>🔥</div>
            <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>
              {receta.calorias} kcal
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16 }}>👥</div>
            <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>
              {receta.porciones} pers.
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16 }}>💪</div>
            <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>
              {receta.macros.proteinas}g prot.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Modal de Receta ──────────────────────────────────────────────
function ModalReceta({ receta, onClose }) {
  const [tabActiva, setTabActiva] = useState("ingredientes");

  if (!receta) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.white,
          borderRadius: "24px 24px 0 0",
          width: "100%",
          maxWidth: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Imagen cabecera */}
        <div style={{ position: "relative" }}>
          <img
            src={receta.imagen}
            alt={receta.titulo}
            style={{ width: "100%", height: 220, objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(transparent 40%, rgba(16,42,67,0.85))",
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            ✕
          </button>
          {receta.premium && (
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                background: "linear-gradient(135deg, #f1c40f, #e67e22)",
                color: "#fff",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ⭐ Premium
            </div>
          )}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#fff",
                fontSize: 20,
                fontWeight: 800,
                fontFamily: "'Poppins', sans-serif",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {receta.titulo}
            </h2>
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}
            >
              <BadgeDificultad dificultad={receta.dificultad} />
              <Estrellas valor={receta.valoracion} />
            </div>
          </div>
        </div>

        {/* Stats rápidos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            background: COLORS.primary,
            padding: "12px 0",
          }}
        >
          {[
            { icon: "⏱️", val: `${receta.tiempo}m`, label: "Tiempo" },
            { icon: "🔥", val: `${receta.calorias}`, label: "Calorías" },
            { icon: "👥", val: `${receta.porciones}`, label: "Porciones" },
            {
              icon: "💪",
              val: `${receta.macros.proteinas}g`,
              label: "Proteínas",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{ textAlign: "center", padding: "4px 0" }}
            >
              <div style={{ fontSize: 18 }}>{item.icon}</div>
              <div
                style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                {item.val}
              </div>
              <div style={{ color: COLORS.gray400, fontSize: 10 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Macros */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            padding: "16px 20px 0",
          }}
        >
          {[
            {
              label: "Proteínas",
              val: receta.macros.proteinas,
              color: "#3498db",
            },
            { label: "Carbos", val: receta.macros.carbos, color: "#e67e22" },
            { label: "Grasas", val: receta.macros.grasas, color: "#27ae60" },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                background: COLORS.gray100,
                borderRadius: 12,
                padding: "10px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: m.color,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {m.val}g
              </div>
              <div style={{ fontSize: 11, color: COLORS.gray500, marginTop: 2 }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            padding: "12px 20px",
          }}
        >
          {receta.tags.map((t) => (
            <span
              key={t}
              style={{
                background: `${COLORS.accent}18`,
                color: COLORS.accentDark,
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
                border: `1px solid ${COLORS.accent}40`,
              }}
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: `2px solid ${COLORS.gray100}`,
            padding: "0 20px",
          }}
        >
          {[
            { id: "ingredientes", label: "🛒 Ingredientes" },
            { id: "preparacion", label: "👨‍🍳 Preparación" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              style={{
                background: "none",
                border: "none",
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color:
                  tabActiva === tab.id ? COLORS.accent : COLORS.gray500,
                borderBottom:
                  tabActiva === tab.id
                    ? `3px solid ${COLORS.accent}`
                    : "3px solid transparent",
                marginBottom: -2,
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido tabs */}
        <div style={{ padding: "16px 20px 30px" }}>
          {tabActiva === "ingredientes" && (
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {receta.ingredientes.map((ing, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 0",
                    borderBottom:
                      i < receta.ingredientes.length - 1
                        ? `1px solid ${COLORS.gray100}`
                        : "none",
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      background: `${COLORS.accent}18`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: COLORS.gray700,
                    }}
                  >
                    {ing}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tabActiva === "preparacion" && (
            // TODO: Agregar pasos de preparación detallados desde el backend
            <div>
              <p
                style={{
                  fontSize: 14,
                  color: COLORS.gray600,
                  lineHeight: 1.7,
                  margin: "0 0 16px",
                }}
              >
                {receta.descripcion}
              </p>
              <div
                style={{
                  background: `${COLORS.accent}10`,
                  border: `1px solid ${COLORS.accent}30`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24 }}>👨‍🍳</span>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.accentDark,
                      marginBottom: 4,
                    }}
                  >
                    Pasos detallados disponibles en Premium
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.gray600 }}>
                    Accede a los pasos de preparación paso a paso,
                    vídeos y consejos de chef con el plan Premium.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Pantalla: Inicio ─────────────────────────────────────────────
function PantallaInicio({ onNavegar }) {
  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 60%, ${COLORS.accent} 100%)`,
          padding: "40px 20px 50px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decoración de fondo */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 150,
            height: 150,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: COLORS.accent,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              🥦
            </div>
            <div>
              <div
                style={{
                  color: COLORS.white,
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1,
                }}
              >
                NutriSencillo
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 12,
                }}
              >
                Tu recetario saludable
              </div>
            </div>
          </div>

          <h1
            style={{
              color: COLORS.white,
              fontSize: 26,
              fontWeight: 800,
              margin: "0 0 10px",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.2,
            }}
          >
            Come sano,{" "}
            <span style={{ color: COLORS.accentLight }}>vive mejor</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 14,
              margin: "0 0 24px",
              lineHeight: 1.6,
            }}
          >
            Descubre recetas nutritivas y deliciosas adaptadas a tu
            estilo de vida.
          </p>

          <button
            onClick={() => onNavegar("recetas")}
            style={{
              background: COLORS.accent,
              color: COLORS.white,
              border: "none",
              borderRadius: 30,
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(39,174,96,0.4)",
              transition: "all 0.2s",
            }}
          >
            Explorar Recetas 🍽️
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          padding: "20px 16px",
          background: COLORS.white,
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        {[
          { num: "300+", label: "Recetas", icon: "📖" },
          { num: "15+", label: "Categorías", icon: "🏷️" },
          { num: "50k+", label: "Usuarios", icon: "❤️" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.primary,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {s.num}
            </div>
            <div style={{ fontSize: 11, color: COLORS.gray500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* Categorías rápidas */}
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.primary,
            margin: "0 0 14px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Explora por Categoría
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {CATEGORIAS.filter((c) => c.id !== "todos").map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavegar("recetas", cat.id)}
              style={{
                background: COLORS.white,
                border: `2px solid ${COLORS.gray200}`,
                borderRadius: 14,
                padding: "14px 8px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.background = `${COLORS.accent}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.gray200;
                e.currentTarget.style.background = COLORS.white;
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{cat.emoji}</div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: COLORS.primary,
                }}
              >
                {cat.label}
              </div>
            </button>
          ))}
        </div>

        {/* Recetas destacadas */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.primary,
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Más Valoradas
          </h2>
          <button
            onClick={() => onNavegar("recetas")}
            style={{
              background: "none",
              border: "none",
              color: COLORS.accent,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Ver todas →
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {RECETAS.sort((a, b) => b.valoracion - a.valoracion)
            .slice(0, 3)
            .map((r) => (
              <RecetaHorizontal key={r.id} receta={r} />
            ))}
        </div>
      </div>
    </div>
  );
}

// ── Card Receta Horizontal ───────────────────────────────────────
function RecetaHorizontal({ receta }) {
  const [hovered, setHovered] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <div
        onClick={() => setModalAbierto(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: COLORS.white,
          borderRadius: 16,
          display: "flex",
          gap: 12,
          padding: 12,
          cursor: "pointer",
          boxShadow: hovered
            ? "0 8px 24px rgba(16,42,67,0.15)"
            : "0 2px 8px rgba(16,42,67,0.07)",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "all 0.2s ease",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={receta.imagen}
            alt={receta.titulo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <h3
              style={{
                margin: "0 0 4px",
                fontSize: 14,
                fontWeight: 700,
                color: COLORS.primary,
                lineHeight: 1.3,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {receta.titulo}
            </h3>
            {receta.premium && (
              <span style={{ fontSize: 14, flexShrink: 0 }}>⭐</span>
            )}
          </div>
          <Estrellas valor={receta.valoracion} />
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 6,
            }}
          >
            <span style={{ fontSize: 11, color: COLORS.gray500 }}>
              ⏱️ {receta.tiempo}m
            </span>
            <span style={{ fontSize: 11, color: COLORS.gray500 }}>
              🔥 {receta.calorias} kcal
            </span>
            <BadgeDificultad dificultad={receta.dificultad} />
          </div>
        </div>
      </div>
      {modalAbierto && (
        <ModalReceta receta={receta} onClose={() => setModalAbierto(false)} />
      )}
    </>
  );
}

// ── Pantalla: Recetas ────────────────────────────────────────────
function PantallaRecetas({ categoriaInicial }) {
  const [categoriaActiva, setCategoriaActiva] = useState(
    categoriaInicial || "todos"
  );
  const [busqueda, setBusqueda] = useState("");
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [filtroTiempo, setFiltroTiempo] = useState("todos");

  const recetasFiltradas = RECETAS.filter((r) => {
    const coincideCategoria =
      categoriaActiva === "todos" || r.categoria === categoriaActiva;
    const coincideBusqueda =
      r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(busqueda.toLowerCase()));
    const coincideTiempo =
      filtroTiempo === "todos" ||
      (filtroTiempo === "rapido" && r.tiempo <= 15) ||
      (filtroTiempo === "medio" && r.tiempo > 15 && r.tiempo <= 30) ||
      (filtroTiempo === "largo" && r.tiempo > 30);
    return coincideCategoria && coincideBusqueda && coincideTiempo;
  });

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          padding: "24px 16px 20px",
        }}
      >
        <h1
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 800,
            margin: "0 0 4px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Recetario 📖
        </h1>
        <p
          style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "0 0 16px" }}
        >
          {RECETAS.length} recetas saludables para ti
        </p>

        {/* Buscador */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 14,
              fontSize: 16,
              color: COLORS.gray400,
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar recetas, ingredientes..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px 12px 42px",
              borderRadius: 30,
              border: "none",
              fontSize: 14,
              background: "rgba(255,255,255,0.95)",
              color: COLORS.gray800,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Filtro de tiempo */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 16px",
          background: COLORS.white,
          overflowX: "auto",
          borderBottom: `1px solid ${COLORS.gray100}`,
        }}
      >
        {[
          { id: "todos", label: "⏱️ Todos" },
          { id: "rapido", label: "⚡ <15 min" },
          { id: "medio", label: "🕐 15-30 min" },
          { id: "largo", label: "🍳 >30 min" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltroTiempo(f.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: `2px solid ${filtroTiempo === f.id ? COLORS.accent : COLORS.gray200}`,
              background:
                filtroTiempo === f.id ? `${COLORS.accent}15` : COLORS.white,
              color:
                filtroTiempo === f.id ? COLORS.accentDark : COLORS.gray600,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tabs categorías */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 16px",
          overflowX: "auto",
          background: COLORS.white,
        }}
      >
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 30,
              border: "none",
              background:
                categoriaActiva === cat.id ? COLORS.primary : COLORS.gray100,
              color:
                categoriaActiva === cat.id ? COLORS.white : COLORS.gray600,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              boxShadow:
                categoriaActiva === cat.id
                  ? "0 4px 12px rgba(16,42,67,0.3)"
                  : "none",
            }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Contador */}
      <div
        style={{
          padding: "8px 16px",
          background: COLORS.gray100,
          fontSize: 12,
          color: COLORS.gray500,
        }}
      >
        {recetasFiltradas.length} receta
        {recetasFiltradas.length !== 1 ? "s" : ""} encontrada
        {recetasFiltradas.length !== 1 ? "s" : ""}
      </div>

      {/* Grid de recetas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          padding: "16px",
        }}
      >
        {recetasFiltradas.length > 0 ? (
          recetasFiltradas.map((r) => (
            <CardReceta
              key={r.id}
              receta={r}
              onClick={setRecetaSeleccionada}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 20px",
              color: COLORS.gray400,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: COLORS.gray600,
                marginBottom: 8,
              }}
            >
              No encontramos recetas
            </div>
            <div style={{ fontSize: 14 }}>
              Prueba con otros términos de búsqueda
            </div>
          </div>
        )}
      </div>

      {recetaSeleccionada && (
        <ModalReceta
          receta={recetaSeleccionada}
          onClose={() => setRecetaSeleccionada(null)}
        />
      )}
    </div>
  );
}

// ── Pantalla: Planes ─────────────────────────────────────────────
function PantallaPlanes() {
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          padding: "32px 20px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>💎</div>
        <h1
          style={{
            color: COLORS.white,
            fontSize: 24,
            fontWeight: 800,
            margin: "0 0 10px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Planes NutriSencillo
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 14,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Elige el plan que mejor se adapte a tu estilo de vida saludable
        </p>
      </div>

      <div style={{ padding: "20px 16px" }}>
        {PLANES.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setPlanSeleccionado(plan.id)}
            style={{
              background: COLORS.white,
              borderRadius: 20,
              padding: "24px 20px",
              marginBottom: 16,
              boxShadow:
                planSeleccionado === plan.id
                  ? `0 8px 32px ${plan.color}40`
                  : "0 4px 16px rgba(0,0,0,0.07)",
              border: `2px solid ${planSeleccionado === plan.id ? plan.color : COLORS.gray100}`,
              cursor: "pointer",
              transition: "all 0.2s ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {plan.popular && (
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: -10,
                  background: "linear-gradient(135deg, #f1c40f, #e67e22)",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 20px 4px 12px",
                  borderRadius: "20px 0 0 20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                ⭐ MÁS POPULAR
              </div>
            )}

            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 6px",
                    fontSize: 18,
                    fontWeight: 800,
                    color: plan.color,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {plan.nombre}
                </h2>
                <p
                  style={{
                    margin: "0 0 16px",
                    fontSize: 13,
                    color: COLORS.gray500,
                  }}
                >
                  {plan.descripcion}
                </p>
              </div>
              <div
                style={{
                  textAlign: "right",
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: plan.color,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {plan.precio}
                </div>
              </div>
            </div>

            <ul style={{ margin: "0 0 20px", padding: 0, listStyle: "none" }}>
              {plan.features.map((feat, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 0",
                    fontSize: 13,
                    color: COLORS.gray700,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      background: plan.color,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: "#fff",
                      flexShrink: 0,
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  {feat}
                </li>
              ))}
            </ul>

            {/* TODO: Conectar con pasarela de pago real */}
            <button
              style={{
                width: "100%",
                padding: "14px",
                background:
                  planSeleccionado === plan.id
                    ? plan.color
                    : `${plan.color}15`,
                color:
                  planSeleccionado === plan.id ? COLORS.white : plan.color,
                border: `2px solid ${plan.color}`,
                borderRadius: 30,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {plan.precio === "Gratis"
                ? "Comenzar Gratis"
                : planSeleccionado === plan.id
                ? "✓ Plan Seleccionado"
                : "Elegir Plan"}
            </button>
          </div>
        ))}

        {/* Garantía */}
        <div
          style={{
            background: `${COLORS.accent}10`,
            borderRadius: 16,
            padding: "20px",
            textAlign: "center",
            border: `1px solid ${COLORS.accent}30`,
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.primary,
              marginBottom: 6,
            }}
          >
            Garantía 30 días
          </div>
          <div style={{ fontSize: 13, color: COLORS.gray600, lineHeight: 1.5 }}>
            Si no estás satisfecho con NutriSencillo Premium, te
            devolvemos el dinero sin preguntas.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pantalla: Perfil ─────────────────────────────────────────────
function PantallaPerfil() {
  // TODO: Conectar con sistema de autenticación real
  const [nombre] = useState("Usuario");
  const [editando, setEditando] = useState(false);

  const statsUsuario = [
    { icon: "📖", num: "12", label: "Recetas guardadas" },
    { icon: "✅", num: "8", label: "Preparadas" },
    { icon: "🎯", num: "3", label: "Objetivos cumplidos" },
  ];

  const menuItems = [
    { icon: "❤️", label: "Mis Recetas Favoritas", badge: "12" },
    { icon: "📋", label: "Mi Plan Semanal", badge: null },
    { icon: "🛒", label: "Lista de Compras", badge: "5" },
    { icon: "⚖️", label: "Mi Progreso Nutricional", badge: null },
    { icon: "🔔", label: "Notificaciones", badge: "3" },
    { icon: "⚙️", label: "Configuración", badge: null },
    { icon: "💎", label: "Mi Plan Premium", badge: null },
    { icon: "❓", label: "Ayuda y Soporte", badge: null },
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header perfil */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          padding: "32px 20px 50px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
            borderRadius: "50%",
            margin: "0 auto 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            border: "4px solid rgba(255,255,255,0.3)",
          }}
        >
          👤
        </div>
        <h2
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 800,
            margin: "0 0 4px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {nombre}
        </h2>
        {/* TODO: Mostrar email real del usuario autenticado */}
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>
          usuario@email.com
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 20,
            padding: "4px 12px",
            marginTop: 10,
          }}
        >
          <span style={{ fontSize: 12 }}>⭐</span>
          <span style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}>
            Plan Básico
          </span>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          margin: "-24px 16px 20px",
          background: COLORS.white,
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {statsUsuario.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              padding: "16px 8px",
              borderRight:
                i < statsUsuario.length - 1
                  ? `1px solid ${COLORS.gray100}`
                  : "none",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.primary,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontSize: 10,
                color: COLORS.gray500,
                lineHeight: 1.3,
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Menú */}
      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            background: COLORS.white,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {menuItems.map((item, i) => (
            <ItemMenu
              key={item.label}
              item={item}
              isLast={i === menuItems.length - 1}
            />
          ))}
        </div>

        {/* Cerrar sesión */}
        {/* TODO: Conectar con función de logout real */}
        <button
          style={{
            width: "100%",
            marginTop: 16,
            padding: "14px",
            background: `${COLORS.danger}10`,
            color: COLORS.danger,
            border: `2px solid ${COLORS.danger}30`,
            borderRadius: 30,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          🚪 Cerrar Sesión
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: COLORS.gray400,
            marginTop: 16,
          }}
        >
          NutriSencillo v1.0.0 · © 2024
        </p>
      </div>
    </div>
  );
}

function ItemMenu({ item, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: isLast ? "none" : `1px solid ${COLORS.gray100}`,
        cursor: "pointer",
        background: hovered ? COLORS.gray100 : COLORS.white,
        transition: "background 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 20 }}>{item.icon}</span>
        <span style={{ fontSize: 14, color: COLORS.gray700, fontWeight: 500 }}>
          {item.label}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {item.badge && (
          <span
            style={{
              background: COLORS.accent,
              color: COLORS.white,
              borderRadius: 20,
              padding: "2px 8px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {item.badge}
          </span>
        )}
        <span style={{ color: COLORS.gray300, fontSize: 16 }}>›</span>
      </div>
    </div>
  );
}

// ── Navegación inferior ──────────────────────────────────────────
function NavInferior({ activa, onCambiar }) {
  const tabs = [
    { id: "inicio", icon: "🏠", label: "Inicio" },
    { id: "recetas", icon: "📖", label: "Recetas" },
    { id: "planes", icon: "💎", label: "Planes" },
    { id: "perfil", icon: "👤", label: "Perfil" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: COLORS.white,
        borderTop: `1px solid ${COLORS.gray200}`,
        display: "flex",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onCambiar(tab.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0 8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <span
            style={{
              fontSize: 22,
              lineHeight: 1,
              filter: activa === tab.id ? "none" : "grayscale(1) opacity(0.5)",
              transform: activa === tab.id ? "scale(1.2)" : "scale(1)",
              transition: "all 0.2s",
              display: "block",
            }}
          >
            {tab.icon}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              marginTop: 4,
              color: activa === tab.id ? COLORS.accent : COLORS.gray400,
              transition: "color 0.2s",
            }}
          >
            {tab.label}
          </span>
          {activa === tab.id && (
            <span
              style={{
                display: "block",
                width: 4,
                height: 4,
                background: COLORS.accent,
                borderRadius: "50%",
                marginTop: 3,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// ── App Principal ────────────────────────────────────────────────
export default function App() {
  const [pantallaActiva, setPantallaActiva] = useState("inicio");
  const [categoriaInicial, setCategoriaInicial] = useState(null);

  const navegarA = (pantalla, categoria = null) => {
    setCategoriaInicial(categoria);
    setPantallaActiva(pantalla);
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', 'Inter', sans-serif",
        background: COLORS.gray100,
        minHeight: "100vh",
        maxWidth: 500,
        margin: "0 auto",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #f1f5f9; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button { font-family: 'Poppins', sans-serif; }
        input { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div
        style={{
          animation: "fadeIn 0.3s ease",
          minHeight: "100vh",
        }}
      >
        {pantallaActiva === "inicio" && (
          <PantallaInicio onNavegar={navegarA} />
        )}
        {pantallaActiva === "recetas" && (
          <PantallaRecetas categoriaInicial={categoriaInicial} />
        )}
        {pantallaActiva === "planes" && <PantallaPlanes />}
        {pantallaActiva === "perfil" && <PantallaPerfil />}
      </div>

      <NavInferior activa={pantallaActiva} onCambiar={navegarA} />
    </div>
  );
}