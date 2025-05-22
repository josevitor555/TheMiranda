// Recupera um chat específico do localStorage pelo ID
export const getChatFromStorage = (chatId) => {
  try {
    const stored = JSON.parse(localStorage.getItem("tars-chats")) || {};
    return stored[chatId] || null;
  } catch (error) {
    console.error("Erro ao recuperar o chat:", error);
    return null;
  }
};

// Salva ou atualiza um chat específico no localStorage
export const saveChatToStorage = (chatId, chatData) => {
  try {
    const stored = JSON.parse(localStorage.getItem("tars-chats")) || {};
    stored[chatId] = {
      ...chatData,
      updatedAt: Date.now(),
      createdAt: stored[chatId]?.createdAt || Date.now()
    };
    localStorage.setItem("tars-chats", JSON.stringify(stored));
  } catch (error) {
    console.error("Erro ao salvar o chat:", error);
  }
};

// Retorna todos os chats salvos
export const getAllChatsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("tars-chats")) || {};
  } catch (error) {
    console.error("Erro ao recuperar todos os chats:", error);
    return {};
  }
};

// Deleta um chat específico
export const deleteChatFromStorage = (chatId) => {
  try {
    const stored = JSON.parse(localStorage.getItem("tars-chats")) || {};
    if (stored[chatId]) {
      delete stored[chatId];
      localStorage.setItem("tars-chats", JSON.stringify(stored));
    }
  } catch (error) {
    console.error("Erro ao deletar o chat:", error);
  }
};

// Limpa todos os chats (cuidado, operação destrutiva!)
export const clearAllChatsFromStorage = () => {
  try {
    localStorage.removeItem("tars-chats");
  } catch (error) {
    console.error("Erro ao limpar todos os chats:", error);
  }
};
