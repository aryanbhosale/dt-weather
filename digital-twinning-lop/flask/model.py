import cloudpickle
import numpy as np
from statistics import mode
import pandas as pd

class Inference:
    def __init__(self,pickle_path) :
       self.pickle_path = pickle_path
    def load_model(self):
      with open(self.pickle_path, "rb") as f:
        model_enc = cloudpickle.load(f)
        return model_enc[0]
    def load_encoder(self):
      with open(self.pickle_path, "rb") as f:
        model_enc = cloudpickle.load(f)
        return model_enc[1]
    def predict(self,model_ensemble,X,enc):
      y_pred = []
      for model in model_ensemble:
        pred = model.predict(X)
        y_pred.append(pred)
      y_pred = np.apply_along_axis(lambda x: mode(x), 0, y_pred)
      y_pred = enc.inverse_transform(y_pred)
      return(y_pred)
    
def predict(data):
  print(data)
  labels = pd.DataFrame([data])
  pickle_path = "model_enc.pkl"
  inference= Inference(pickle_path)
  model = inference.load_model()
  enc = inference.load_encoder()
  predictions = inference.predict(model,labels,enc)
  return predictions[0]