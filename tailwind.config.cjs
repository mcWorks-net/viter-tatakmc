/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        accent: "var(--accent)",
        accentDark: "var(--accentDark)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        line: "var(--line)",
        header: "var(--header)",
        body: "var(--body)",
        alert: "var(--alert)",
        disable: "var(--disable)",
        alertDark: "var(--alertDark)",
        warning: "var(--warning)",
        warningDark: "var(--warningDark)",
        success: "var(--success)",
        successDark: "var(--successDark)",
        info: "var(--info)",
        infoDark: "var(--infoDark)",
      },

      backgroundColor: {
        accent: "var(--accent)",
        accentDark: "var(--accentDark)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        line: "var(--line)",
        header: "var(--header)",
        body: "var(--body)",
        alert: "var(--alert)",
        disable: "var(--disable)",
        alertDark: "var(--alertDark)",
        warning: "var(--warning)",
        warningDark: "var(--warningDark)",
        success: "var(--success)",
        successDark: "var(--successDark)",
        info: "var(--info)",
        infoDark: "var(--infoDark)",
      },

      borderColor: {
        accent: "var(--accent)",
        accentDark: "var(--accentDark)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        line: "var(--line)",
        header: "var(--header)",
        body: "var(--body)",
        alert: "var(--alert)",
        disable: "var(--disable)",
        alertDark: "var(--alertDark)",
        warning: "var(--warning)",
        warningDark: "var(--warningDark)",
        success: "var(--success)",
        successDark: "var(--successDark)",
        info: "var(--info)",
        infoDark: "var(--infoDark)",
      },

      fontFamily: {
        poppins: "Poppins",
      },

      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(2px)" },
          "50%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
          "100%": { transform: "translateX(0)" },
        },

        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },

        slideUp: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0px)" },
        },

        slideDown: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(10px)" },
        },

        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },

        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

      animation: {
        shake: "shake .2s ease-in-out",
        slideUp: "slideUp .2s ease-in-out",
        slideDown: "slideDown .2s ease-in-out",
        fadeIn: "fadeIn .2s ease-in-out",
        fadeOut: "fadeOut .2s ease-in-out",
        rotate: "rotate 2s linear infinite",
        loading: "loading 1.5s ease-in  infinite",
      },
    },
  },
  plugins: [],
};
