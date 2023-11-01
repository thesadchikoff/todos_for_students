const config = {
    title: 'Todos',
    siteName: 'Todo List'
}
const header = document.getElementById("header")
const wrapper = document.getElementById("wrapper")
const tasksSection = document.getElementById("tasks")
tasksSection.classList.add("flex", "flex-col", "gap-5")
document.title = config.title

function main() {
    const logo = document.createElement('h1')
    logo.textContent = config.siteName
    logo.classList.add("text-2xl", "font-bold", "text-cian-600")
    header.append(logo)

    const sectionTitle = document.createElement('h1')
    sectionTitle.textContent = "Мои задачи";
    wrapper.insertBefore(sectionTitle, tasksSection)
    wrapper.classList.add("p-10", "flex", "flex-col", "gap-10")
    sectionTitle.classList.add("text-xl", "font-medium")

    const tasks = []
    const notFoundMessage = document.createElement('span')
    notFoundMessage.textContent = "Задачи отсутствуют"

    function watchTasks(arr) {
        if (arr.length <= 0) {
            tasksSection.append(notFoundMessage)
        }
    }

    function renderTodo() {
        tasksSection.innerHTML = "";
        tasks.forEach(item => {
            const taskDiv = document.createElement('div');
            const name = document.createElement("span");
            name.textContent = item.name;
            name.setAttribute("data-id", item.id); // Устанавливаем атрибут data-id для каждого элемента
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click", () => {
                // Удаляем элемент из массива todo по его id
                tasks.splice(tasks.findIndex(todoItem => todoItem.id === item.id), 1);
                // Повторно рендерим todo на странице
                renderTodo();
                watchTasks(tasks)
            });

            // Добавляем кнопку удаления к элементу списка
            taskDiv.append(name);
            taskDiv.classList.add("todo")
            tasksSection.appendChild(taskDiv);
            taskDiv.append(deleteButton)// Добавляем элемент в список
        });
    }
    renderTodo()
    function createModal() {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
                <div class="modal-content">
                    <input class="outline-none border-none" type="text" id="input-text" placeholder="Укажи название задачи">
                    <button id="add-btn">Добавить</button>
                </div>
            `;

        // Добавляем модальное окно в body
        document.body.appendChild(modal);

        // Возвращаем модальное окно как результат функции
        return modal;
    }

    const modal = createModal();
    const toggleModalBtn = document.getElementById("toggle-modal-btn");
    const inputText = modal.querySelector("#input-text");
    const addBtn = modal.querySelector("#add-btn");

    // Функция для открытия и закрытия модального окна
    function toggleModal() {
        modal.style.display = (modal.style.display === "none" || modal.style.display === "") ? "flex" : "none";
    }

    // Функция для добавления нового объекта в массив tasks
    function addItem() {
        const text = inputText.value;
        if (text) {
            // Генерируем уникальный id
            const generateIdAndDateNow = Date.now();
            // Создаем новый объект и добавляем его в массив tasks
            tasks.push({ id: generateIdAndDateNow, name: text, isComplete: false, createdAt: generateIdAndDateNow });
            console.log("Добавлена новая задача:", { id: generateIdAndDateNow, name: text, isComplete: false });
            // Закрываем модальное окно после добавления задачи
            renderTodo()
            toggleModal();
        }
    }

    // Назначаем обработчики событий для кнопок и модального окна
    toggleModalBtn.addEventListener("click", toggleModal);
    addBtn.addEventListener("click", addItem);

    // Закрываем модальное окно при клике за его пределами
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            toggleModal();
        }
    });
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            toggleModal();
        }
    });
    watchTasks(tasks)
}


main()





