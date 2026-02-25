const { createClient } = supabase;
const _supabase = createClient('https://lycgoyrlupcwucifthgr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Y2dveXJsdXBjd3VjaWZ0aGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODM2NTQsImV4cCI6MjA4NzU1OTY1NH0.H5p6hz4rVpCLYkrmWloFnhHqPzSylV7cqBEbNewOqHM');

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 1. Hàm lấy dữ liệu từ Supabase
async function getTasks() {
    const { data, error } = await _supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });

    if (error) console.log('Lỗi lấy dữ liệu:', error);
    else renderTasks(data);
}

// 2. Hiển thị danh sách ra HTML
function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Xóa</button>
        `;
        taskList.appendChild(li);
    });
}

// 3. Thêm nhiệm vụ mới
addBtn.addEventListener('click', async () => {
    const title = taskInput.value;
    if (!title) return;

    const { error } = await _supabase.from('tasks').insert([{ title }]);
    if (error) alert('Không thể thêm!');
    else {
        taskInput.value = '';
        getTasks();
    }
});

// 4. Xóa nhiệm vụ
window.deleteTask = async (id) => {
    const { error } = await _supabase.from('tasks').delete().eq('id', id);
    if (error) alert('Lỗi xóa!');
    else getTasks();
};

// Khởi chạy khi tải trang
getTasks();