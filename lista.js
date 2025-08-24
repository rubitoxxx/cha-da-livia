// Crie uma instância do Supabase com a URL e chave do seu projeto
const supabase = window.supabase.createClient(
    'https://rbkmdaajutaehlzfitkw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJia21kYWFqdXRhZWhsemZpdGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNzMxMjUsImV4cCI6MjA3MTY0OTEyNX0.wz9FjAUv8wiLPK0LgtPxvqpMddZYfttVz0jEuwapUy0'
);

// Selecionando os elementos
const form = document.getElementById('attendance-form');
const nameInput = document.getElementById('name');
const attendanceList = document.getElementById('attendance-list');

// Função para adicionar o nome à lista
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio do formulário e recarregamento da página

    const name = nameInput.value.trim();

    if (name) {
        // Criar um novo item de lista
        const listItem = document.createElement('li');
        listItem.textContent = name;

        // Adicionar o item à lista
        attendanceList.appendChild(listItem);

        // Salvar o nome no banco de dados Supabase
        const { data, error } = await supabase
            .from('attendance') // Nome da tabela no Supabase
            .insert([
                { name: name }
            ]);

        if (error) {
            alert('Erro ao adicionar o nome ao banco de dados!');
            console.error(error);
        }

        // Limpar o campo de input após adicionar o nome
        nameInput.value = '';
    } else {
        alert('Por favor, digite um nome!');
    }
});

// Função para carregar os nomes do banco de dados Supabase ao carregar a página
window.onload = async function() {
    const { data, error } = await supabase
        .from('attendance')
        .select('name');

    if (error) {
        console.error('Erro ao carregar os dados:', error);
    } else {
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            attendanceList.appendChild(listItem);
        });
    }
};
