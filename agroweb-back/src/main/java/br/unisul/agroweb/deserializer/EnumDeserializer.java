package br.unisul.agroweb.deserializer;

import br.unisul.agroweb.util.StringUtils;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.lang.reflect.ParameterizedType;

@SuppressWarnings({"unchecked", "rawtypes"})
public class EnumDeserializer<T extends Enum<?>> extends JsonDeserializer<T> {

    @Override
    public T deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        var valor = jsonParser.getValueAsString();

        if (StringUtils.isBlank(valor)) {
            return null;
        }

        var classe = ((Class) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]);

        try {
            return (T) T.valueOf(classe, valor);
        } catch (Exception e) {
            return null;
        }
    }
}
