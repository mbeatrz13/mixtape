import yt_dlp

def baixar_audio_youtube(url_do_video):
    """
    Baixa o áudio de um vídeo do YouTube e salva como arquivo MP3.

    Args:
        url_do_video (str): O link completo do vídeo do YouTube.
    """
    opcoes = {
        # Formato do arquivo: converte para mp3
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192', # Qualidade do áudio (ex: 192kbps)
        }],
        # Nome do arquivo de saída: Título do Vídeo.mp3
        'outtmpl': '%(title)s.mp3',""
        # Opções para evitar o download de metadados desnecessários
        'noplaylist': True,
        'quiet': True,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(opcoes) as ydl:
            ydl.download([url_do_video])
        print(f"✅ Áudio baixado com sucesso! Salvo como '{ydl.extract_info(url_do_video, download=False).get('title')}.mp3'")
    except Exception as e:
        print(f"❌ Ocorreu um erro: {e}")

# --- Exemplo de Uso ---
if __name__ == "__main__":
    # Substitua este link pelo vídeo que você quer baixar
    link_do_video = input("Cole o link do vídeo do YouTube e pressione Enter: ")
    
    if link_do_video:
        baixar_audio_youtube(link_do_video)
    else:
        print("Nenhum link fornecido.")