document.addEventListener ('DOMContentLoaded', function (){
	

	document.querySelector('#botao') .addEventListener('click', function () {
		let temp = []
		const sections = document.querySelectorAll('.card')
		for (let section of sections) {
			const imagem = section.querySelector('.img')
			const nome = section.querySelector('.nome')
			const especie = section.querySelector('.especie')
			const status = section.querySelector('.status')

			let numeroAleatorio = gerarValorAletorio();
			while (temp.indexOf(numeroAleatorio) >= 0) {
				numeroAleatorio = gerarValorAletorio();
			}
			temp.push(numeroAleatorio)
			fetch(`https://rickandmortyapi.com/api/character/${numeroAleatorio}`, {
				method:'GET',
				headers: {
					Accept: 'application/json',
					"Content-type": 'application/json'
				}
			}).then((response) => response.json()).then((data) => {
				imagem.src = data.image;
				imagem.alt = data.name;
				nome.innerHTML = data.name;
				especie.innerHTML = data.species;
				status.innerHTML = traduzirCondicao(data);
			});
		}
	})
	
	traduzirCondicao = (data) => {
		if(data.status == 'unknown'){
			return 'Não sabemos';
		}else if(data.status == 'Alive'){
			return 'Sim';
		}else {
			return 'Não. Está morto';
		}
	}

	gerarValorAletorio = () => {
		return Math.floor(Math.random() * 671);
	}

})

