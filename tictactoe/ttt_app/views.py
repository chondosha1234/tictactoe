from django.shortcuts import render

# Create your views here.
def main_page(request):
    print(request.POST)
    if 'textx' in request.POST:
        playerx = request.POST['textx']
    else:
        playerx = "X"

    if 'texto' in request.POST:
        playero = request.POST['texto']
    else:
        playero = "O"

    context = {
        'playerx': playerx,
        'playero': playero,
    }
    return render(request, 'tictactoe.html', context)

def start_page(request):
    context = {}
    return render(request, 'ttt_start.html', context)
