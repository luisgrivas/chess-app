from flask import Flask, render_template, jsonify, request
import chess
import json

board = chess.Board()
app = Flask(__name__)


@app.route("/")
def init():
    return render_template('index.html' )


@app.route('/move', methods=['GET'])
def move():
    requested_move = request.args.get('move')
    
    is_move_valid = False
    if requested_move in [m.uci() for m in board.legal_moves]:
        move = chess.Move.from_uci(requested_move)
        board.push(move)
        is_move_valid = True
        
    return jsonify({'fen': board.fen(), 'is_move_valid': is_move_valid})


@app.route('/restart', methods=['POST'])
def restart():
    if request.method == 'POST':
        board.reset()
    return init()
