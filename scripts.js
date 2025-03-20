const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise( (resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.nome})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.nome}`)
        }

        leitor.readAsDataURL(arquivo);
    })
}